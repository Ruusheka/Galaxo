import Booking from "../models/bookingModel.js";
import paypal from "@paypal/checkout-server-sdk";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "@clerk/express";
import dotenv from "dotenv";
dotenv.config();

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://galaxo.onrender.com/";

const Environment = process.env.NODE_ENV === "production" ? paypal.core.LiveEnvironment : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(new Environment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET));


const safeNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const genBookingId = () => `BK-${uuidv4()}`;




function buildFrontendBase(req) {
  if (FRONTEND_URL) return FRONTEND_URL.replace(/\/$/, "");
  const origin = req.get("origin");
  if (origin) return origin.replace(/\/$/, "");
  const host = req.get("host");
  if (host) return `${req.protocol}://${host}`.replace(/\/$/, "");
  return null;
}

export const getBookings = async (req, res) => {
  try {
    const { search = "", status, limit: limitRaw = 100, page: pageRaw = 1 } = req.query;
    const limit = Math.min(200, Math.max(1, parseInt(limitRaw, 10) || 50));
    const page = Math.max(1, parseInt(pageRaw, 10) || 1);
    const skip = (page - 1) * limit;

    const filter = {};
    if (status) filter.orderStatus = status;

    if (search) {
      const re = new RegExp(search, "i");
      filter.$or = [
        { bookingId: re },
        { courseName: re },
        { teacherName: re },
        { clerkUserId: re },
        { studentName: re },
      ];
    }

    const items = await Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    return res.json({ success: true, bookings: items, meta: { page, limit, count: items.length } });
  } catch (err) {
    console.error("Error in getBookings:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkBooking = async (req, res) => {
  try {
    const { userId } = getAuth(req) || {};
    if (!userId) return res.status(200).json({ success: false, enrolled: false, booking: null });

    const { courseId } = req.query;
    if (!courseId) return res.status(400).json({ success: false, message: "courseId is required" });

    const booking = await Booking.findOne({
      clerkUserId: userId,
      course: courseId,
      orderStatus: "Confirmed",
    })
      .sort({ createdAt: -1 })
      .lean();

    if (!booking) return res.status(200).json({ success: true, enrolled: false, booking: null });

    const paid = booking.paymentStatus === "Paid" && booking.orderStatus === "Confirmed";

    return res.status(200).json({ success: true, enrolled: paid, booking });
  } catch (error) {
    console.error("Error in checkBooking:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = getAuth(req) || {};
    if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });

    const { courseId, courseName, teacherName = "", price, notes = "", email, studentName } = req.body;
    if (!courseId || !courseName) return res.status(400).json({ success: false, message: "courseId and courseName required" });

    const numericPrice = safeNumber(price);
    if (numericPrice === null || numericPrice < 0) {
      return res.status(400).json({ success: false, message: "price must be a valid number" });
    }

    const bookingId = genBookingId();

    const resolvedStudentName =
      (studentName && String(studentName).trim()) ||
      (email && String(email).trim()) ||
      `User-${String(userId).slice(0, 8)}`;

    const basePayload = {
      bookingId,
      clerkUserId: userId,
      studentName: resolvedStudentName,
      course: courseId,
      courseName,
      teacherName,
      price: numericPrice,
      paymentMethod: "Online",
      paymentStatus: "Unpaid",
      notes,
      orderStatus: "Pending",
      createdAt: new Date(),
    };

    if (numericPrice === 0) {
      const booking = await Booking.create({
        ...basePayload,
        paymentStatus: "Paid",
        orderStatus: "Confirmed",
        paidAt: new Date(),
      });
      return res.status(201).json({ success: true, booking, checkoutUrl: null });
    }

    if (!paypalClient) return res.status(500).json({ success: false, message: "PayPal not configured on server" });

    const base = buildFrontendBase(req);
    if (!base) return res.status(500).json({ success: false, message: "Frontend URL not determined." });

    // PayPal auto-appends ?token=... to the return_url
    const successUrl = `${base}/booking/success`;
    const cancelUrl = `${base}/booking/cancel`;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: bookingId,
          description: courseName,
          amount: {
            currency_code: "USD",
            value: numericPrice.toFixed(2),
          },
        },
      ],
      application_context: {
        return_url: successUrl,
        cancel_url: cancelUrl,
        brand_name: "LMS Platform",
        user_action: "PAY_NOW",
      },
    });

    let order;
    try {
      order = await paypalClient.execute(request);
    } catch (ppErr) {
      console.error("PayPal create order error:", ppErr);
      const message = ppErr?.message || "PayPal error";
      return res.status(502).json({ success: false, message: `Payment provider error: ${message}` });
    }

    const approveLink = order.result.links.find((link) => link.rel === "approve");
    if (!approveLink) {
      return res.status(500).json({ success: false, message: "PayPal did not return approval link" });
    }

    try {
      const booking = await Booking.create({
        ...basePayload,
        sessionId: order.result.id, // Storing PayPal Order ID in sessionId field
        paymentIntentId: null,
      });
      return res.status(201).json({ success: true, booking, checkoutUrl: approveLink.href });
    } catch (dbErr) {
      console.error("DB error saving booking after paypal order:", dbErr);
      return res.status(500).json({ success: false, message: "Failed to create booking record" });
    }
  } catch (err) {
    console.error("createBooking unexpected:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { userId } = getAuth(req) || {};
    if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });

    // PayPal returns 'token' in the URL, which is the Order ID.
    // Frontend might still be sending 'session_id' if it wasn't updated, 
    // or if the frontend logic grabs the query param that PayPal sends.
    // We check both for robustness.
    const { session_id, token } = req.query;
    const orderId = token || session_id;

    if (!orderId) return res.status(400).json({ success: false, message: "Order ID (token/session_id) is required" });
    if (!paypalClient) return res.status(500).json({ success: false, message: "PayPal not configured" });

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    let capture;
    try {
      capture = await paypalClient.execute(request);
    } catch (err) {
      // If it's already captured or other error
      console.error("PayPal capture error:", err);
      return res.status(502).json({ success: false, message: "Failed to capture payment" });
    }

    const captureResult = capture.result;
    if (captureResult.status !== "COMPLETED") {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }

    // Capture ID
    const purchaseUnit = captureResult.purchase_units[0];
    const captureId = purchaseUnit?.payments?.captures?.[0]?.id || null;

    let booking = await Booking.findOneAndUpdate(
      { sessionId: orderId },
      { paymentStatus: "Paid", paymentIntentId: captureId, orderStatus: "Confirmed", paidAt: new Date() },
      { new: true }
    );

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    return res.json({ success: true, booking });
  } catch (err) {
    console.error("confirmPayment:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { userId } = getAuth(req) || {};
    if (!userId) return res.status(401).json({ success: false, message: "Authentication required" });

    const bookings = await Booking.find({ clerkUserId: userId }).sort({ createdAt: -1 }).lean();
    return res.json({ success: true, bookings });
  } catch (err) {
    console.error("Error in getUserBookings:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalRevenueAgg = await Booking.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    const totalRevenue = (totalRevenueAgg[0] && totalRevenueAgg[0].total) || 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const bookingLast7Days = await Booking.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    const topCourses = await Booking.aggregate([
      { $group: { _id: "$courseName", count: { $sum: 1 }, revenue: { $sum: "$price" } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
      { $project: { courseName: "$_id", count: 1, revenue: 1, _id: 0 } },
    ]);

    return res.json({
      success: true,
      stats: { totalBookings, totalRevenue, bookingLast7Days, topCourses },
    });
  } catch (err) {
    console.error("Error in getStats:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const handleWebhook = async (req, res) => {
  try {
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    if (!webhookId) {
      console.warn("PAYPAL_WEBHOOK_ID not set, skipping verification.");
      return res.status(200).send("Webhook received (no verification)");
    }

    const headers = req.headers;
    const body = req.body;

    const eventType = body.event_type;
    const resource = body.resource;

    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
      const captureId = resource.id;
      const orderId = resource.supplementary_data?.related_ids?.order_id;

      if (orderId) {
        console.log(`Webhook: Payment completed for order ${orderId}`);

        await Booking.findOneAndUpdate(
          { sessionId: orderId },
          {
            paymentStatus: "Paid",
            paymentIntentId: captureId,
            orderStatus: "Confirmed",
            paidAt: new Date()
          }
        );
      }
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).send("Webhook Error");
  }
};

