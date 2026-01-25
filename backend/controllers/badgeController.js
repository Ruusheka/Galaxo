import Badge from "../models/badgeModel.js";

// Award a badge when course is completed
export const awardBadge = async (req, res) => {
    try {
        const { clerkUserId, courseId, courseName, studentName, pricePaid } = req.body;

        if (!clerkUserId || !courseId || !courseName) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Check if badge already exists
        const existingconfig = await Badge.findOne({ clerkUserId, courseId });
        if (existingconfig) {
            return res.status(200).json({ success: true, message: "Badge already awarded", badge: existingconfig, newlyAwarded: false });
        }

        const newBadge = new Badge({
            clerkUserId,
            courseId,
            courseName,
            badgeType: "Gold",
            // If schema supports it, save these:
            studentName: studentName || "",
            pricePaid: pricePaid || 0
        });

        await newBadge.save();

        res.status(201).json({ success: true, message: "Badge awarded!", badge: newBadge, newlyAwarded: true });

    } catch (error) {
        console.error("Award Badge Error:", error);
        res.status(500).json({ success: false, message: "Server error awarding badge" });
    }
};

// Get all badges for a user
export const getUserBadges = async (req, res) => {
    try {
        const { clerkUserId } = req.query; // Pass as query param

        if (!clerkUserId) {
            return res.status(400).json({ success: false, message: "Missing clerkUserId" });
        }

        const badges = await Badge.find({ clerkUserId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, badges });
    } catch (error) {
        console.error("Get Badges Error:", error);
        res.status(500).json({ success: false, message: "Server error fetching badges" });
    }
};

// Get single badge by ID (Public)
export const getBadgeById = async (req, res) => {
    try {
        const { id } = req.params;
        const badge = await Badge.findById(id);

        if (!badge) {
            return res.status(404).json({ success: false, message: "Badge not found" });
        }

        res.status(200).json({ success: true, badge });
    } catch (error) {
        console.error("Get Badge By ID Error:", error);
        res.status(500).json({ success: false, message: "Server error fetching badge" });
    }
};
