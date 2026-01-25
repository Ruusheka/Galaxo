import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Clock,
  BookOpen,
  ChevronDown,
  CheckCircle,
  Circle,
  X,
  ArrowLeft,
  User,
  Award,
  Target,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  courseDetailStyles,
} from "../assets/dummyStyles";
import BadgeModal from "../components/BadgeModal";

import { useUser, useAuth } from "@clerk/clerk-react";

const API_BASE = "http://localhost:4000";

const fmtMinutes = (mins) => {
  const h = Math.floor((mins || 0) / 60);
  const m = (mins || 0) % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
};

const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`${courseDetailStyles.toast} ${type === "error" ? courseDetailStyles.toastError : courseDetailStyles.toastInfo
        }`}
    >
      <div className={courseDetailStyles.toastContent}>
        <span>{message}</span>
        <button onClick={onClose} className={courseDetailStyles.toastClose}>
          <X className={courseDetailStyles.toastCloseIcon} />
        </button>
      </div>
    </div>
  );
};

/* helpers for video URLs */
const toEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const trimmed = String(url).trim();
    if (/\/embed\//.test(trimmed)) return trimmed;
    const watchMatch = trimmed.match(/[?&]v=([^&#]+)/);
    if (watchMatch && watchMatch[1])
      return `https://www.youtube.com/embed/${watchMatch[1]}`;
    const shortMatch = trimmed.match(/youtu\.be\/([^?&#/]+)/);
    if (shortMatch && shortMatch[1])
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
    const lastSeg = trimmed.split("/").filter(Boolean).pop();
    if (lastSeg && lastSeg.length === 11)
      return `https://www.youtube.com/embed/${lastSeg}`;
    return trimmed;
  } catch (e) {
    return url;
  }
};

const appendAutoplay = (embedUrl, autoplay = true) => {
  if (!embedUrl) return "";
  if (!autoplay) return embedUrl;
  return embedUrl.includes("?")
    ? `${embedUrl}&autoplay=1`
    : `${embedUrl}?autoplay=1`;
};

const normalizeCourse = (c) => {
  if (!c) return c;
  const course = { ...c };
  course.lectures = Array.isArray(course.lectures)
    ? course.lectures.map((l) => {
      const lecture = { ...l };
      lecture.id = lecture._id || lecture.id;
      lecture.durationMin =
        lecture.durationMin ??
        lecture.totalMinutes ??
        (lecture.duration?.hours || 0) * 60 +
        (lecture.duration?.minutes || 0);
      lecture.chapters = Array.isArray(lecture.chapters)
        ? lecture.chapters.map((ch) => {
          const chapter = { ...ch };
          chapter.id = chapter._id || chapter.id;
          chapter.durationMin =
            chapter.durationMin ??
            chapter.totalMinutes ??
            (chapter.duration?.hours || 0) * 60 +
            (chapter.duration?.minutes || 0);
          return chapter;
        })
        : [];
      return lecture;
    })
    : [];
  return course;
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = id;

  const { user } = useUser();
  const { getToken } = useAuth();
  const isLoggedIn = Boolean(user);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);

  const [toast, setToast] = useState(null);
  const [expandedLectures, setExpandedLectures] = useState(new Set());
  const [completedChapters, setCompletedChapters] = useState(new Set());
  const [isTeacherAnimating, setIsTeacherAnimating] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [hasBadge, setHasBadge] = useState(false);
  const [userBadge, setUserBadge] = useState(null);

  const studentNameFromUser = useMemo(() => {
    if (!user) return "";
    const fullName =
      user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const email =
      user.primaryEmailAddress?.emailAddress ||
      (user.emailAddresses && user.emailAddresses[0]?.emailAddress) ||
      "";
    return fullName || email || "";
  }, [user]);

  const studentEmailFromUser = useMemo(() => {
    if (!user) return "";
    return (
      user.primaryEmailAddress?.emailAddress ||
      (user.emailAddresses && user.emailAddresses[0]?.emailAddress) ||
      ""
    );
  }, [user]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/api/course/${courseId}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Failed to fetch course ${courseId}`);
        }
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        if (!json || !json.success) {
          throw new Error((json && json.message) || "Failed to load course");
        }
        const normalized = normalizeCourse(json.course);
        setCourse(normalized);
      })
      .catch((err) => {
        console.error("Failed to load course:", err);
        if (mounted) setError(err.message || "Failed to load course");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [courseId]);

  useEffect(() => {
    let mounted = true;
    if (!course) return;

    const checkEnrollment = async () => {
      try {
        let headers = { "Content-Type": "application/json" };
        let opts = { method: "GET" };
        if (getToken) {
          try {
            // Attempt to get token, suppress 404s/errors
            const token = await getToken().catch((err) => {
              console.warn("Clerk token fetch failed (session likely expired):", err);
              setToast({ message: "Session expired. Please Sign Out and Sign In again to verify enrollment.", type: "error" });
              return null;
            });

            if (token) {
              headers.Authorization = `Bearer ${token}`;
              opts = { method: "GET", headers };
            } else {
              opts = { method: "GET", credentials: "include", headers };
            }
          } catch (e) {
            // Failsafe catch
            opts = { method: "GET", credentials: "include", headers };
          }
        } else {
          opts = { method: "GET", credentials: "include", headers };
        }

        const q = `${API_BASE}/api/booking/check?courseId=${encodeURIComponent(
          course._id ?? course.id ?? courseId
        )}`;
        const res = await fetch(q, opts);
        const data = await res.json().catch(() => ({}));

        let serverBooking =
          data.booking || data.bookingRecord || data.data || null;
        if (!serverBooking && data.sessionBooking)
          serverBooking = data.sessionBooking;

        const serverSaysEnrolled =
          data.enrolled ||
          data.userEnrolled ||
          data.alreadyBooked ||
          data.bookingExists;

        const bookingPaidOrConfirmed =
          serverBooking &&
          (serverSaysEnrolled ||
            serverBooking.paymentStatus === "Paid" ||
            serverBooking.paymentStatus === "paid" ||
            serverBooking.orderStatus === "Confirmed" ||
            serverBooking.orderStatus === "confirmed" ||
            !!serverBooking.paidAt);

        if (mounted && bookingPaidOrConfirmed) {
          setBookingInfo(serverBooking || null);
          setIsEnrolled(true);
          return;
        }

        if (mounted && serverBooking) {
          setBookingInfo(serverBooking);
          setIsEnrolled(false);
          return;
        }

        if (mounted) {
          setBookingInfo(null);
          setIsEnrolled(false);
        }
      } catch (err) {
        console.debug("booking.check failed:", err);
        // keep previous state (do not flip)
      }
    };

    checkEnrollment();
    return () => (mounted = false);
  }, [course, isLoggedIn, getToken, courseId]);

  useEffect(() => {
    setIsTeacherAnimating(true);
    const timer = setTimeout(() => setIsTeacherAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [course]);

  useEffect(() => setIsPageLoaded(true), []);



  const [selectedContent, setSelectedContent] = useState({
    type: "lecture",
    lectureId: null,
    chapterId: null,
  });

  const selectedLecture = useMemo(() => {
    if (!selectedContent.lectureId || !course) return null;
    return (
      (course.lectures || []).find(
        (l) =>
          String(l.id) === String(selectedContent.lectureId) ||
          String(l._id) === String(selectedContent.lectureId)
      ) || null
    );
  }, [course, selectedContent.lectureId]);

  const selectedChapter = useMemo(() => {
    if (!selectedContent.chapterId || !selectedLecture) return null;
    return (
      (selectedLecture.chapters || []).find(
        (ch) =>
          String(ch.id) === String(selectedContent.chapterId) ||
          String(ch._id) === String(selectedContent.chapterId)
      ) || null
    );
  }, [selectedLecture, selectedContent.chapterId]);

  const currentVideoContent = useMemo(() => {
    if (selectedContent.type === "chapter" && selectedChapter)
      return selectedChapter;
    if (selectedContent.type === "lecture" && selectedLecture)
      return selectedLecture;
    return null;
  }, [selectedContent, selectedLecture, selectedChapter]);

  const totalMinutes = useMemo(
    () =>
      (course?.lectures || []).reduce(
        (sum, l) => sum + (l.durationMin || l.totalMinutes || 0),
        0
      ),
    [course]
  );

  const priceObj = course?.price;
  const hasPriceObj = !!(
    priceObj &&
    (priceObj.sale != null || priceObj.original != null)
  );
  const salePrice =
    hasPriceObj && priceObj.sale != null ? Number(priceObj.sale) : null;
  const originalPrice =
    hasPriceObj && priceObj.original != null ? Number(priceObj.original) : null;
  const formatCurrency = (n) => (n == null || Number.isNaN(n) ? "" : `$${n}`);
  const hasDiscount =
    originalPrice != null && salePrice != null && originalPrice > salePrice;
  const courseIsFree = course
    ? !!course.isFree ||
    !course.price ||
    (!course.price.sale && !course.price.original) ||
    course.pricingType === "free"
    : true;

  const totalChaptersCount = (course?.lectures || []).flatMap(l => l.chapters || []).length || 0;
  const completionPercentage = totalChaptersCount > 0
    ? Math.round((completedChapters.size / totalChaptersCount) * 100)
    : 0;

  // Check if user already has badge for persistence
  useEffect(() => {
    if (!user) return;
    const checkBadge = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/badge/user?clerkUserId=${user.id}`);
        const data = await res.json();
        if (data.success) {
          // Check both ID formats just in case
          const foundBadge = data.badges.find(b =>
            b.courseId === courseId ||
            (course && (b.courseId === course._id || b.courseId === course.id))
          );
          if (foundBadge) {
            setHasBadge(true);
            setUserBadge(foundBadge);
          }
        }
      } catch (e) {
        console.error("Failed to check badge status", e);
      }
    };
    checkBadge();
  }, [user, courseId, course]);

  // Check for course completion (Session based)
  useEffect(() => {
    if (!isLoggedIn || !isEnrolled || !course) return;

    // Collect all valid chapter IDs from the course to ensure we only check actual chapters
    const allChapterIds = (course.lectures || []).flatMap(l => (l.chapters || []).map(c => c.id)).filter(Boolean);
    const totalChaptersCount = allChapterIds.length;

    // Strict check: Ensure EVERY chapter ID is in the completedChapters set
    const allChaptersCompleted = totalChaptersCount > 0 && allChapterIds.every(id => completedChapters.has(id));

    if (allChaptersCompleted && !hasBadge) {
      const awardBadge = async () => {
        try {
          const numericPrice = salePrice != null ? salePrice : (originalPrice != null ? originalPrice : 0);

          const payload = {
            courseId: course._id ?? course.id ?? courseId,
            courseName: course.name,
            clerkUserId: user.id,
            studentName: studentNameFromUser,
            pricePaid: numericPrice
          };

          const headers = { "Content-Type": "application/json" };
          let opts = { method: "POST", headers, body: JSON.stringify(payload) };

          if (getToken) {
            try {
              const token = await getToken().catch(() => null);
              if (token) headers.Authorization = `Bearer ${token}`;
            } catch (e) {
              console.warn("Token fetch failed in awardBadge", e);
            }
          }

          const res = await fetch(`${API_BASE}/api/badge/award`, opts);
          const data = await res.json();

          if (data.success) {
            setHasBadge(true); // Persist locally
            setUserBadge(data.badge);
            if (data.newlyAwarded) {
              setShowBadgeModal(true);
            }
          }
        } catch (error) {
          console.error("Error awarding badge:", error);
        }
      };
      awardBadge();
    }
  }, [completedChapters, course, isLoggedIn, isEnrolled, user, salePrice, originalPrice, courseId, studentNameFromUser, hasBadge]);

  const toggleLecture = (lectureId) => {
    setExpandedLectures((prev) => {
      const next = new Set(prev);
      if (next.has(lectureId)) next.delete(lectureId);
      else next.add(lectureId);
      return next;
    });
  };

  const handleContentSelect = (lectureId, chapterId = null) => {
    if (isLoggedIn && isEnrolled) {
      setSelectedContent({
        type: chapterId ? "chapter" : "lecture",
        lectureId,
        chapterId,
      });
      setExpandedLectures((prev) =>
        prev.has(lectureId) ? new Set(prev) : new Set([...prev, lectureId])
      );
      return;
    }
    if (!isLoggedIn) {
      setToast({
        message: "Please login to access course content",
        type: "error",
      });
      return;
    }
    if (!isEnrolled && bookingInfo && bookingInfo.price > 0) {
      // booking exists but unpaid
      setToast({
        message:
          "You have a pending payment for this course. Complete payment to access content.",
        type: "error",
      });
      return;
    }
    setToast({
      message: "Please enroll in the course to access content",
      type: "error",
    });
    return;
  };

  const onLectureHeaderClick = (lectureId) => {
    const isOpen = expandedLectures.has(lectureId);
    if (isOpen) {
      setExpandedLectures((prev) => {
        const next = new Set(prev);
        next.delete(lectureId);
        return next;
      });
      if (selectedContent.lectureId === lectureId) {
        setSelectedContent({
          type: "lecture",
          lectureId: null,
          chapterId: null,
        });
      }
      return;
    }
    if (!isEnrolled) {
      if (!isLoggedIn) {
        setToast({ message: "Please login to view chapters", type: "error" });
      } else if (
        bookingInfo &&
        bookingInfo.price > 0 &&
        (bookingInfo.paymentStatus === "Unpaid" ||
          bookingInfo.paymentStatus === "unpaid")
      ) {
        setToast({
          message: "Payment pending. Complete payment to view chapters.",
          type: "error",
        });
      } else {
        setToast({ message: "Please enroll to view chapters", type: "error" });
      }
      return;
    }
    setExpandedLectures((prev) => new Set([...prev, lectureId]));
    handleContentSelect(lectureId, null);
  };

  const toggleChapterCompletion = (chapterId, e) => {
    if (e) e.stopPropagation();
    if (!isLoggedIn || !isEnrolled) {
      setToast({
        message: "Please enroll and login to track progress",
        type: "error",
      });
      return;
    }
    setCompletedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) next.delete(chapterId);
      else next.add(chapterId);
      return next;
    });
  };

  // create or complete booking (enroll)
  const handleEnroll = async () => {
    if (!isLoggedIn) {
      setToast({
        message: "Please login to enroll in the course",
        type: "error",
      });
      return;
    }
    if (!course) {
      setToast({ message: "Course not loaded", type: "error" });
      return;
    }

    if (isEnrolled) {
      setToast({
        message: "You are already enrolled in this course.",
        type: "info",
      });
      return;
    }

    setIsEnrolling(true);
    try {
      const numericPrice =
        salePrice != null
          ? salePrice
          : originalPrice != null
            ? originalPrice
            : 0;
      const studentName = studentNameFromUser || "";
      const email = studentEmailFromUser || "";

      const payload = {
        courseId: course._id ?? course.id ?? courseId,
        courseName: course.name,
        teacherName: course.teacher || "",
        price: numericPrice,
        studentName,
        email,
      };

      let headers = { "Content-Type": "application/json" };
      let opts = {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        credentials: "include",
      };

      if (getToken) {
        try {
          const token = await getToken().catch(() => null);
          if (token) {
            headers.Authorization = `Bearer ${token}`;
            opts = {
              method: "POST",
              headers,
              body: JSON.stringify(payload),
            };
          }
        } catch (e) {
          // keep credentials include fallback
        }
      }

      const res = await fetch(`${API_BASE}/api/booking/create`, opts);
      const data = await res.json().catch(() => ({ success: false }));

      if (!res.ok || !data.success) {
        const msg =
          (data && (data.message || data.error)) ||
          `Failed to create booking (${res.status})`;
        const alreadyBooked =
          /already booked|already enrolled|booking exists/i.test(msg) ||
          data.alreadyBooked ||
          data.bookingExists;
        if (alreadyBooked) {
          // Re-run server-side check to get booking state
          setToast({
            message:
              "You already have a booking for this course. Checking status...",
            type: "info",
          });
          try {
            const q = `${API_BASE}/api/booking/check?courseId=${encodeURIComponent(
              payload.courseId
            )}`;
            const checkOpts =
              opts.method === "POST"
                ? { method: "GET", headers: opts.headers }
                : { method: "GET", credentials: "include" };
            const chkRes = await fetch(q, checkOpts);
            const chkData = await chkRes.json().catch(() => ({}));
            if (chkData.booking) setBookingInfo(chkData.booking);
            // if server claims enrolled -> set
            if (
              chkData.enrolled ||
              chkData.userEnrolled ||
              chkData.bookingExists ||
              chkData.alreadyBooked
            ) {
              setIsEnrolled(true);
              setToast({ message: "You're enrolled.", type: "info" });
            } else {
              // if booking exists but unpaid
              if (chkData.booking)
                setToast({
                  message: "Booking found — payment pending.",
                  type: "info",
                });
            }
          } catch (e) {
            console.debug("re-check after alreadyBooked:", e);
          }
          return;
        }
        throw new Error(msg);
      }

      // If checkout is required (Stripe) — redirect the user
      if (data.checkoutUrl) {
        // Keep bookingInfo if server returned booking
        if (data.booking) setBookingInfo(data.booking);
        window.location.href = data.checkoutUrl;
        return;
      }

      // If server returned booking (free course or immediate confirmed)
      if (data.booking) {
        setBookingInfo(data.booking);
        // determine paid/confirmed
        const b = data.booking;
        const paid =
          b.paymentStatus === "Paid" ||
          b.paymentStatus === "paid" ||
          b.orderStatus === "Confirmed" ||
          b.orderStatus === "confirmed" ||
          !!b.paidAt;

        if (paid) {
          setIsEnrolled(true);
          setToast({
            message:
              numericPrice === 0
                ? "Enrolled successfully (free course)."
                : "Enrollment succeeded.",
            type: "info",
          });
          // for a paid course that was marked paid by server, navigate to My Courses
          if (numericPrice > 0) {
            navigate("/my-courses");
          }
          return;
        }

        // booking exists but unpaid (pending payment)
        if (numericPrice > 0 && !paid) {
          setIsEnrolled(false);
          setToast({
            message: "Booking created — complete payment to access the course.",
            type: "info",
          });
          return;
        }

        // fallback: mark enrolled
        setIsEnrolled(true);
        setToast({ message: "Enrolled.", type: "info" });
        return;
      }

      // if no booking returned but success true — assume enrolled for free courses
      if (data.success) {
        if (numericPrice === 0) {
          setIsEnrolled(true);
          setToast({ message: "Enrolled (free course).", type: "info" });
        } else {
          setToast({
            message: "Enrollment initiated, complete payment.",
            type: "info",
          });
        }
      }
    } catch (err) {
      console.error("Enroll error:", err);
      setToast({ message: err.message || "Enrollment failed", type: "error" });
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleBackToHome = () => navigate("/");

  if (loading) return <div className="p-6 text-center">Loading course...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  if (!course) {
    if (!course) {
      return (
        <div className={courseDetailStyles.notFoundContainer}>
          <div className={courseDetailStyles.notFoundContent}>
            <h2 className={courseDetailStyles.notFoundTitle}>
              Course not found
            </h2>
            <p className={courseDetailStyles.notFoundText}>
              Go back to courses list
            </p>
            <button
              onClick={() => navigate("/courses")}
              className={courseDetailStyles.notFoundButton}
            >
              Back to courses
            </button>
          </div>
        </div>
      );
    }
  }

  // derive UI state for pricing button:
  const bookingPendingPayment =
    bookingInfo &&
    (bookingInfo.paymentStatus === "Unpaid" ||
      bookingInfo.paymentStatus === "unpaid") &&
    (salePrice || originalPrice || bookingInfo.price) > 0;

  return (
    <div className={courseDetailStyles.container}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div
        className={`${courseDetailStyles.mainContainer} ${isPageLoaded
          ? courseDetailStyles.containerVisible
          : courseDetailStyles.containerHidden
          }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToHome}
            className={courseDetailStyles.backButton}
          >
            <ArrowLeft className={courseDetailStyles.backIcon} />
            <span className={courseDetailStyles.backText}>Back to Home</span>
          </button>

          <div />
        </div>

        <div className={courseDetailStyles.header}>
          <div className={courseDetailStyles.badge}>
            <BookOpen className={courseDetailStyles.badgeIcon} />
            <span className={courseDetailStyles.badgeText}>
              {courseIsFree ? "Free Course" : "Premium Course"}
            </span>
          </div>

          <h1 className={courseDetailStyles.title}>{course.name}</h1>

          {course.overview && (
            <div className={courseDetailStyles.overviewContainer}>
              <div className={courseDetailStyles.overview}>
                <div className={courseDetailStyles.overviewHeader}>
                  <Target className={courseDetailStyles.overviewIcon} />
                  <h3 className={courseDetailStyles.overviewTitle}>
                    Course Overview
                  </h3>
                </div>
                <p className={courseDetailStyles.overviewText}>
                  {course.overview}
                </p>
              </div>
            </div>
          )}

          <div className={courseDetailStyles.statsContainer}>
            <div className={courseDetailStyles.statItem}>
              <Clock className={courseDetailStyles.statIcon} />
              <span className={courseDetailStyles.statText}>
                {fmtMinutes(totalMinutes)}
              </span>
            </div>
            <div className={courseDetailStyles.statItem}>
              <BookOpen className={courseDetailStyles.statIcon} />
              <span className={courseDetailStyles.statText}>
                {(course.lectures || []).length} lectures
              </span>
            </div>

            <div
              className={`${courseDetailStyles.teacherStat} ${isTeacherAnimating ? courseDetailStyles.teacherAnimating : ""
                }`}
            >
              <User className={courseDetailStyles.statIcon} />
              <span className={courseDetailStyles.statText}>
                {course.teacher}
              </span>
            </div>
          </div>
        </div>

        <div className={courseDetailStyles.mainGrid}>
          <div className={courseDetailStyles.videoSection}>
            <div className={courseDetailStyles.videoContainer}>
              {currentVideoContent?.videoUrl ? (
                <iframe
                  title={currentVideoContent.title || currentVideoContent.name}
                  src={appendAutoplay(
                    toEmbedUrl(currentVideoContent.videoUrl),
                    isLoggedIn && isEnrolled
                  )}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={courseDetailStyles.iframe}
                />
              ) : (
                <div className={courseDetailStyles.videoPlaceholder}>
                  <div className={courseDetailStyles.videoPlaceholderBg}>
                    <div
                      className={courseDetailStyles.videoPlaceholderOrb1}
                    ></div>
                    <div
                      className={courseDetailStyles.videoPlaceholderOrb2}
                    ></div>
                  </div>
                  <div className={courseDetailStyles.videoPlaceholderContent}>
                    <div className={courseDetailStyles.videoPlaceholderIcon}>
                      <Play
                        className={courseDetailStyles.videoPlaceholderPlayIcon}
                      />
                    </div>
                    <p className={courseDetailStyles.videoPlaceholderText}>
                      Select a lecture or chapter to play video
                    </p>
                    {(!isLoggedIn || !isEnrolled) && (
                      <p className={courseDetailStyles.videoPlaceholderSubtext}>
                        {!isLoggedIn
                          ? "Login required to view content"
                          : bookingPendingPayment
                            ? "Payment pending"
                            : "Enrollment required"}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className={courseDetailStyles.videoInfo}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={courseDetailStyles.videoTitle}>
                      {currentVideoContent?.title ||
                        currentVideoContent?.name ||
                        "Select content to play"}
                    </h3>
                    <p className={courseDetailStyles.videoDescription}>
                      {selectedContent.type === "chapter"
                        ? `Part of: ${course.lectures.find(
                          (l) => l.id === selectedContent.lectureId
                        )?.title || "Lecture"
                        }`
                        : "Focus and learn"}
                    </p>
                  </div>
                </div>
                <div className={courseDetailStyles.videoMeta}>
                  <div className={courseDetailStyles.durationBadge}>
                    <Clock className={courseDetailStyles.durationIcon} />
                    <span>
                      {fmtMinutes(currentVideoContent?.durationMin || 0)}
                    </span>
                  </div>
                  {selectedContent.type === "chapter" && (
                    <span className={courseDetailStyles.chapterBadge}>
                      Chapter {selectedContent.chapterId}
                    </span>
                  )}
                </div>

                {selectedContent.type === "chapter" &&
                  isLoggedIn &&
                  isEnrolled && (
                    <div className={courseDetailStyles.completionSection}>
                      <button
                        onClick={(e) =>
                          toggleChapterCompletion(selectedContent.chapterId, e)
                        }
                        className={`${courseDetailStyles.completionButton} ${completedChapters.has(selectedContent.chapterId)
                          ? courseDetailStyles.completionButtonCompleted
                          : courseDetailStyles.completionButtonIncomplete
                          }`}
                      >
                        {completedChapters.has(selectedContent.chapterId) ? (
                          <>
                            <CheckCircle
                              className={courseDetailStyles.completionIcon}
                            />
                            <span>Completed</span>
                          </>
                        ) : (
                          <>
                            <Circle
                              className={courseDetailStyles.completionIcon}
                            />
                            <span>Mark Complete</span>
                          </>
                        )}
                      </button>
                      <p className={courseDetailStyles.completionText}>
                        Track your progress as you learn
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className={courseDetailStyles.sidebar}>
            <div className={courseDetailStyles.contentCard}>
              <div className={courseDetailStyles.contentHeader}>
                <h3 className={courseDetailStyles.contentTitle}>
                  Course Content
                </h3>
                {courseIsFree && (
                  <div className={courseDetailStyles.freeBadge}>
                    <Sparkles className={courseDetailStyles.freeBadgeIcon} />
                    Free Access
                  </div>
                )}
              </div>

              <div className={courseDetailStyles.contentList}>
                {(course.lectures || []).map((lecture, lIndex) => (
                  <div
                    key={`${lecture.id || lecture._id || lIndex}-${lIndex}`}
                    className={courseDetailStyles.lectureItem}
                  >
                    <div
                      onClick={() => toggleLecture(lecture.id)}
                      className={`${courseDetailStyles.lectureHeader} ${expandedLectures.has(lecture.id)
                        ? courseDetailStyles.lectureHeaderExpanded
                        : courseDetailStyles.lectureHeaderCollapsed
                        }`}
                    >
                      <div className={courseDetailStyles.lectureHeaderContent}>
                        <div className={courseDetailStyles.lectureLeftSection}>
                          <ChevronDown
                            className={`${courseDetailStyles.lectureChevron} ${expandedLectures.has(lecture.id)
                              ? courseDetailStyles.lectureChevronExpanded
                              : courseDetailStyles.lectureChevronCollapsed
                              }`}
                          />
                          <div className={courseDetailStyles.lectureInfo}>
                            <h4 className={courseDetailStyles.lectureTitle}>
                              {lecture.title}
                            </h4>
                            <div className={courseDetailStyles.lectureMeta}>
                              <div className={courseDetailStyles.lectureDuration}>
                                <Clock
                                  className={courseDetailStyles.durationIcon}
                                />
                                {fmtMinutes(lecture.durationMin)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className={courseDetailStyles.lectureChapterCount}>
                          {(lecture.chapters || []).length} chapters
                        </span>
                      </div>
                    </div>

                    {expandedLectures.has(lecture.id) && (
                      <div className={courseDetailStyles.chapterList}>
                        {(lecture.chapters || []).map((chapter, index) => {
                          const isSelected =
                            selectedContent.lectureId === lecture.id &&
                            selectedContent.chapterId === chapter.id;
                          const isCompleted = completedChapters.has(chapter.id);
                          const isLocked = !isEnrolled && !courseIsFree;

                          return (
                            <div
                              key={chapter.id || index}
                              onClick={() => {
                                if (isLocked) {
                                  setToast({ message: "Enroll to access content", type: "error" });
                                  return;
                                }
                                handleContentSelect(lecture.id, chapter.id);
                              }}
                              className={`${courseDetailStyles.chapterItem} ${isSelected
                                ? courseDetailStyles.chapterSelected
                                : courseDetailStyles.chapterNotSelected
                                } ${isLocked ? courseDetailStyles.chapterDisabled : ""
                                }`}
                            >
                              <div className={courseDetailStyles.chapterContent}>
                                <div className={courseDetailStyles.chapterLeftSection}>
                                  {isLoggedIn && isEnrolled ? (
                                    <button
                                      onClick={(e) =>
                                        toggleChapterCompletion(chapter.id, e)
                                      }
                                      className={`${courseDetailStyles.completionToggle
                                        } ${isCompleted
                                          ? courseDetailStyles.completionToggleCompleted
                                          : courseDetailStyles.completionToggleIncomplete
                                        }`}
                                    >
                                      {isCompleted ? (
                                        <CheckCircle
                                          className={
                                            courseDetailStyles.completionIconSmall
                                          }
                                        />
                                      ) : (
                                        <Circle
                                          className={
                                            courseDetailStyles.completionIconSmall
                                          }
                                        />
                                      )}
                                    </button>
                                  ) : (
                                    <Play
                                      className={`${courseDetailStyles.completionIconSmall} text-slate-500`}
                                    />
                                  )}
                                  <div className={courseDetailStyles.chapterText}>
                                    <div
                                      className={`${courseDetailStyles.chapterName} ${isSelected
                                        ? courseDetailStyles.chapterNameSelected
                                        : courseDetailStyles.chapterNameNotSelected
                                        }`}
                                    >
                                      {chapter.name}
                                    </div>
                                    <div
                                      className={courseDetailStyles.chapterTopic}
                                    >
                                      {chapter.topic}
                                    </div>
                                  </div>
                                </div>
                                <span className={courseDetailStyles.chapterDuration}>
                                  {fmtMinutes(chapter.durationMin)}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={courseDetailStyles.pricingCard}>
              <div className={courseDetailStyles.pricingHeader}>
                <h3 className={courseDetailStyles.pricingTitle}>
                  Enrollment
                </h3>
              </div>

              {!isEnrolled ? (
                <>
                  <div className={courseDetailStyles.pricingAmount}>
                    {courseIsFree ? ( // Check explicitly for free course
                      <span className={courseDetailStyles.price}>Free</span>
                    ) : (
                      <>
                        <span className={courseDetailStyles.price}>
                          {salePrice ? `$${salePrice}` : originalPrice ? `$${originalPrice}` : "Free"}
                        </span>
                        {salePrice && originalPrice && (
                          <span className={courseDetailStyles.originalPrice}>
                            ${originalPrice}
                          </span>
                        )}
                      </>
                    )}
                    {(salePrice || courseIsFree) && originalPrice && (
                      <span className={courseDetailStyles.discountBadge}>
                        {Math.round(((originalPrice - (salePrice || 0)) / originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <p className={courseDetailStyles.pricingDescription}>
                    {courseIsFree
                      ? "Get unlimited access to this course content."
                      : "Full lifetime access • Certificate of completion"}
                  </p>
                </>
              ) : (
                <p className={courseDetailStyles.pricingDescription}>
                  You are enrolled in this course.
                </p>
              )}


              <div className="mt-6">
                {!isEnrolled ? (
                  !isLoggedIn ? (
                    <button
                      onClick={() =>
                        setToast({ message: "Please log in first", type: "error" })
                      }
                      className={`${courseDetailStyles.enrollButton} ${courseDetailStyles.enrollPaidButton}`}
                    >
                      <User className={courseDetailStyles.enrollIcon} />
                      Login to Enroll
                      <ArrowRight className={courseDetailStyles.enrollArrow} />
                    </button>
                  ) : bookingPendingPayment ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-200 text-sm text-center">
                        Payment Pending
                      </div>
                      <button
                        onClick={handleEnroll} // Redirects to Stripe/Checkout
                        className={`${courseDetailStyles.enrollButton} ${courseDetailStyles.enrollPaidButton}`}
                      >
                        Complete Payment
                        <ArrowRight className={courseDetailStyles.enrollArrow} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                      className={`${courseDetailStyles.enrollButton} ${courseIsFree
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30"
                        : courseDetailStyles.enrollPaidButton
                        }`}
                    >
                      {isEnrolling ? (
                        <>
                          <div className={courseDetailStyles.enrollSpinner}></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Play className={courseDetailStyles.enrollIcon} />
                          {courseIsFree ? "Enroll Now (Free)" : "Enroll Now"}
                          <ArrowRight className={courseDetailStyles.enrollArrow} />
                        </>
                      )}
                    </button>
                  )
                ) : (
                  <button
                    disabled
                    className={`${courseDetailStyles.enrollButton} ${courseDetailStyles.enrolledButton}`}
                  >
                    <CheckCircle className={courseDetailStyles.enrollIcon} />
                    Enrolled
                  </button>
                )}
              </div>
            </div>

            <div className={courseDetailStyles.progressCard}>
              <div className={courseDetailStyles.progressHeader}>
                <Award className={courseDetailStyles.progressIcon} />
                <h5 className={courseDetailStyles.progressTitle}>Your Progress</h5>
              </div>
              <div className={courseDetailStyles.progressContent}>

                {/* Progress Bar Section */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Total Progress</span>
                    <span className="font-semibold text-violet-400">
                      {hasBadge ? "100" : Math.round(
                        (completedChapters.size /
                          (course.lectures?.flatMap(l => l.chapters || []).length || 1)) * 100
                      )}%
                    </span>
                  </div>
                  <div className={courseDetailStyles.progressBar}>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all duration-500"
                        style={{ width: `${hasBadge ? 100 : completionPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Status & Badge Button */}
                <div className="flex flex-col gap-3">
                  {hasBadge ? (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-emerald-400 text-sm font-medium">
                      <CheckCircle size={16} />
                      <span>Course Completed</span>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 text-center">
                      {completedChapters.size} of {totalChaptersCount} lessons completed
                    </p>
                  )}

                  {(completionPercentage === 100 || hasBadge) && (
                    <button
                      onClick={() => setShowBadgeModal(true)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold text-sm rounded-lg transition-all shadow-lg hover:shadow-amber-500/30"
                    >
                      <Award size={18} />
                      View Badge
                    </button>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white mb-1">
                      {fmtMinutes(totalMinutes)}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">
                      Duration
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white mb-1">
                      {hasBadge ? totalChaptersCount : completedChapters.size}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">
                      Completed
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <style>{courseDetailStyles.animations}</style>

            {showBadgeModal && (
              <BadgeModal
                courseName={course?.name || "Course"}
                studentName={studentNameFromUser || "Student"}
                badgeId={userBadge?._id}
                onClose={() => setShowBadgeModal(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;