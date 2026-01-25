import React, { useState, useEffect } from "react";
import { myCoursesStyles, myCoursesCustomStyles } from "../assets/dummyStyles";
import { useUser, useAuth } from "@clerk/clerk-react";
import { User, Play, Star, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE = "https://galaxo.onrender.com";

const MyCourses = () => {

    const navigate = useNavigate();
    const { isSignedIn } = useUser();
    const { getToken } = useAuth();
    const [courses, setCourses] = useState([]);
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [userRatings, setUserRatings] = useState(() => {
        try {
            const raw = localStorage.getItem("userCourseRatings");
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    });

    const [hoverRatings, setHoverRatings] = useState({});

    useEffect(() => {
        try {
            localStorage.setItem("userCourseRatings", JSON.stringify(userRatings));
        } catch { }
    }, [userRatings]);

    //fetch
    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        const fetchMyCourses = async () => {
            setLoading(true);
            setError(null);
            try {
                // If user isn't signed in, don't call the protected endpoint.
                if (!isSignedIn) {
                    if (mounted) {
                        setCourses([]);
                        setLoading(false);
                    }
                    return;
                }
                // Prepare headers and attempt to include Clerk token
                const headers = { "Content-Type": "application/json" };
                try {
                    const token = await getToken().catch(() => null);
                    if (token) headers.Authorization = `Bearer ${token}`;
                } catch (e) {
                    // ignore token acquisition failure; server will respond 401
                }
                const bookingsRes = await fetch(`${API_BASE}/api/booking/my`, {
                    method: "GET",
                    credentials: "include",
                    signal: controller.signal,
                    headers,
                });

                // explicit handling for unauthorized
                if (bookingsRes.status === 401) {
                    throw new Error(
                        "Unauthorized — please sign in to view your bookings."
                    );
                }

                if (!bookingsRes.ok) {
                    const text = await bookingsRes.text().catch(() => "");
                    throw new Error(
                        text || `Failed to fetch bookings (${bookingsRes.status})`
                    );
                }

                const bookingsJson = await bookingsRes.json();
                if (!bookingsJson || bookingsJson.success === false) {
                    throw new Error(
                        (bookingsJson && bookingsJson.message) || "Failed to load bookings"
                    );
                }
                const bookings = bookingsJson.bookings || [];
                // (the rest of your logic is unchanged — fetch courses for each booking)
                const combined = await Promise.all(
                    bookings.map(async (b) => {
                        const courseId = b.course ?? b.courseId ?? null;
                        if (!courseId) return null;

                        try {
                            const cHeaders = { "Content-Type": "application/json" };
                            try {
                                const token = await getToken().catch(() => null);
                                if (token) cHeaders.Authorization = `Bearer ${token}`;
                            } catch (e) { }

                            const courseRes = await fetch(
                                `${API_BASE}/api/course/${courseId}`,
                                {
                                    method: "GET",
                                    credentials: "include",
                                    signal: controller.signal,
                                    headers: cHeaders,
                                }
                            );

                            if (!courseRes.ok) {
                                console.warn(
                                    `Course ${courseId} not available (status ${courseRes.status}). Skipping booking.`
                                );
                                return null;
                            }

                            const courseJson = await courseRes.json().catch(() => null);
                            if (!courseJson || !courseJson.success || !courseJson.course) {
                                console.warn(
                                    `Course ${courseId} response invalid; skipping booking.`
                                );
                                return null;
                            }

                            const courseData = courseJson.course;

                            return {
                                booking: b,
                                course: {
                                    ...courseData,
                                    image: courseData.image || null,
                                    avgRating:
                                        typeof courseData.avgRating !== "undefined"
                                            ? courseData.avgRating
                                            : courseData.rating ?? 0,
                                    totalRatings:
                                        typeof courseData.totalRatings !== "undefined"
                                            ? courseData.totalRatings
                                            : courseData.ratingCount ?? 0,
                                },
                            };
                        } catch (err) {
                            if (controller.signal.aborted) return null;
                            console.warn("Course fetch error for", courseId, err);
                            return null;
                        }
                    })
                );

                if (!mounted) return;
                const valid = combined.filter(Boolean);
                const uiCourses = valid.map(({ booking, course }) => ({
                    booking,
                    id: course._id ?? course.id ?? booking.course ?? booking.courseId,
                    name: course.name ?? booking.courseName ?? "Untitled Course",
                    teacher: course.teacher ?? booking.teacherName ?? "",
                    image: course.image ?? null,
                    avgRating: course.avgRating ?? 0,
                    totalRatings: course.totalRatings ?? 0,
                    isFree: !!(
                        course.pricingType === "free" ||
                        !course.price ||
                        (course.price.sale == null && course.price.original == null) ||
                        (course.price &&
                            (course.price.sale === 0 || course.price.original === 0))
                    ),
                    price: course.price ?? {
                        original: booking.price ?? 0,
                        sale: booking.price ?? 0,
                    },
                    overview: course.overview ?? "",
                    lectures: course.lectures ?? [],
                    rawCourse: course,
                    rawBooking: booking,
                }));
                setCourses(uiCourses);
                // fetch user's per-course rating (unchanged)
                if (isSignedIn && uiCourses.length > 0) {
                    const ratingPromises = uiCourses.map(async (c) => {
                        if (!c.id) return null;
                        try {
                            const rHeaders = { "Content-Type": "application/json" };
                            try {
                                const token = await getToken().catch(() => null);
                                if (token) rHeaders.Authorization = `Bearer ${token}`;
                            } catch (e) { }
                            const res = await fetch(
                                `${API_BASE}/api/course/${c.id}/rating`,
                                {
                                    method: "GET",
                                    headers: rHeaders,
                                    credentials: "include",
                                }
                            );
                            const data = await res.json().catch(() => null);
                            if (res.ok && data && data.success && data.myRating) {
                                return { courseId: c.id, myRating: data.myRating.rating };
                            }
                        } catch (err) { }
                        return null;
                    });

                    const results = await Promise.all(ratingPromises);
                    const ratingsMap = {};
                    results.forEach((r) => {
                        if (r && r.courseId) ratingsMap[r.courseId] = r.myRating;
                    });
                    if (mounted && Object.keys(ratingsMap).length) {
                        setUserRatings((prev) => ({ ...prev, ...ratingsMap }));
                    }
                }
            } catch (err) {
                if (mounted) setError(err.message || "Failed to load your courses");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        const fetchBadges = async () => {
            if (!isSignedIn) return;
            try {
                let headers = {};
                if (getToken) {
                    const token = await getToken().catch(() => null);
                    if (token) headers.Authorization = `Bearer ${token}`;
                }
                // We need clerkUserId. If useUser is loaded, we have user.id
                // But fetchBadges is inside useEffect depending on isSignedIn.
                // We can't access 'user' easily here if not in dependency. 
                // Wait, useUser is hook. 
            } catch (e) { }
        };

        fetchMyCourses();
        return () => {
            mounted = false;
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignedIn]);

    // Separate effect for badges to safely access 'user'
    const { user } = useUser();
    useEffect(() => {
        if (!isSignedIn || !user) return;

        const getBadges = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/badge/user?clerkUserId=${user.id}`);
                const data = await res.json();
                if (data.success) {
                    setBadges(data.badges);
                }
            } catch (e) {
                console.error("Failed to fetch badges", e);
            }
        };
        getBadges();
    }, [isSignedIn, user]);

    // Helper: optimistic submit rating to server
    const submitRatingToServer = async (courseId, ratingValue) => {
        try {
            const headers = { "Content-Type": "application/json" };
            try {
                if (getToken) {
                    const token = await getToken().catch(() => null);
                    if (token) headers.Authorization = `Bearer ${token}`;
                }
            } catch (err) {
                // ignore token failure
            }
            const res = await fetch(`${API_BASE}/api/course/${courseId}/rate`, {
                method: "POST",
                headers,
                credentials: "include",
                body: JSON.stringify({ rating: ratingValue }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok && !data.success) {
                const msg =
                    (data && (data.message || data.error)) ||
                    `Failed to rate (${res.status})`;
                throw new Error(msg);
            }

            const avg =
                data.avgRating ?? data.course?.avgRating ?? data.avgRating ?? null;
            const total =
                data.totalRatings ??
                data.course?.ratingCount ??
                data.totalRatings ??
                null;

            if (avg !== null || total !== null) {
                setCourses((prev) =>
                    prev.map((c) =>
                        c.id === courseId
                            ? {
                                ...c,
                                avgRating: typeof avg === "number" ? avg : c.avgRating,
                                totalRatings:
                                    typeof total === "number" ? total : c.totalRatings,
                            }
                            : c
                    )
                );
            }
            setUserRatings((prev) => ({ ...prev, [courseId]: ratingValue }));
            toast.success("Thanks for rating!");
            return { success: true };
        } catch (err) {
            console.error("submitRatingToServer:", err);
            toast.error(err.message || "Failed to submit rating");
            return { success: false, error: err };
        }
    };

    const handleSetRating = async (e, courseId, rating) => {
        e.stopPropagation();
        const { isSignedIn: signed } = { isSignedIn };
        if (!signed) {
            toast("Please sign in to rate", { icon: "⭐" });
            return;
        }

        setUserRatings((prev) => ({
            ...prev,
            [courseId]: rating
        }));
        await submitRatingToServer(courseId, rating);
    };

    const handleViewCourse = (courseId) => {
        if (!courseId) return;
        navigate(`/course/${courseId}`);
    };

    //stars
    const renderInteractiveStars = (c) => {
        const userRating = userRatings[c.id] || 0;
        const hover = hoverRatings[c.id] || 0;
        const baseDisplay = userRating || Math.round(c.avgRating || 0);
        const displayRating = hover || baseDisplay;
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{ display: "flex", gap: 4, alignItems: "center" }}
                >
                    {Array.from({ length: 5 }).map((_, i) => {
                        const idx = i + 1;
                        const filled = idx <= displayRating;
                        return (
                            <button
                                key={i}
                                aria-label={`Rate ${idx} stars`}
                                onClick={(e) => handleSetRating(e, c.id, idx)}
                                onMouseEnter={() =>
                                    setHoverRatings((s) => ({ ...s, [c.id]: idx }))
                                }
                                onMouseLeave={() =>
                                    setHoverRatings((s) => ({ ...s, [c.id]: 0 }))
                                }
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    padding: 2,
                                    cursor: "pointer",
                                }}
                            >
                                <Star
                                    size={16}
                                    fill={filled ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    style={{
                                        color: filled ? "#f59e0b" : "#d1d5db",
                                    }}
                                />
                            </button>
                        );
                    })}
                </div>
                <div
                    style={{ display: "flex", flexDirection: "column", marginLeft: 6 }}
                >
                    <div style={{ fontWeight: 700, fontSize: 13 }}>
                        {(c.avgRating || 0).toFixed(1)}
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                        ({c.totalRatings || 0})
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className={myCoursesStyles.pageContainer}>
                <div className={myCoursesStyles.mainContainer}>
                    <h1 className={myCoursesStyles.header}>My Course</h1>
                    <p className={myCoursesStyles.emptyText}>Loading...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={myCoursesStyles.pageContainer}>
                <div className={myCoursesStyles.mainContainer}>
                    <h1 className={myCoursesStyles.header}>My Course</h1>
                    <p className={myCoursesStyles.emptyText} style={{ color: "red" }}>{error}</p>
                </div>
            </div>
        )
    }

    if (!courses || courses.length === 0) {
        return (
            <div className={myCoursesStyles.pageContainer}>
                <div className={myCoursesStyles.mainContainer}>
                    <h1 className={myCoursesStyles.header}>My Course</h1>
                    <p className={myCoursesStyles.emptyText}> You haven't enrolled in any course yet</p>
                </div>
            </div>
        )
    }

    return (
        <div className={myCoursesStyles.pageContainer}>
            <div className={myCoursesStyles.mainContainer}>

                {/* Badges Section */}
                {badges.length > 0 && (
                    <div className="mb-12 animate-fade-in-down">
                        <div className="flex items-center gap-3 mb-6">
                            <Award className="w-8 h-8 text-amber-400" />
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 font-orbiter">
                                Earned Badges
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {badges.map((badge, idx) => (
                                <div key={badge._id || idx} className="group relative bg-[#0A0A0F] border border-white/5 hover:border-amber-500/30 rounded-3xl p-8 flex flex-col items-center gap-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.2)] overflow-hidden cursor-default">

                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-900/10 border border-amber-500/20 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
                                        <div className="absolute inset-0 bg-amber-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                                        <Award className="w-10 h-10 text-amber-500 group-hover:text-amber-200 transition-colors" strokeWidth={1.5} />
                                    </div>

                                    <div className="text-center w-full">
                                        <h3 className="text-lg font-bold text-white font-orbiter tracking-wide mb-2 line-clamp-1" title={badge.courseName}>
                                            {badge.courseName}
                                        </h3>
                                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-500 font-bold tracking-widest uppercase">
                                            <Award size={10} />
                                            Gold Tier
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`/certificate/${badge._id}`, '_blank');
                                        }}
                                        className="mt-2 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/30 rounded-xl text-xs text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                                    >
                                        View Certificate
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <h1 className={myCoursesStyles.header}>My Course</h1>

                <div className={myCoursesStyles.grid}>
                    {courses.map((course, index) => (
                        <div key={`${course.id}-${index}`} className={myCoursesStyles.courseCard} style={{ animationDelay: `${index * 100}ms`, animation: `fadeInUp 0.6s ease-out ${index * 100}ms both` }} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") handleViewCourse(course.id) }} onClick={() => handleViewCourse(course.id)}>
                            {badges.some(b => b.courseId === course.id || b.courseId === course._id) && (
                                <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-amber-500 text-[#05050A] text-[10px] font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                                    <Award className="w-3 h-3" />
                                    <span>EARNED</span>
                                </div>
                            )}
                            <div className={myCoursesStyles.imageContainer}>
                                <img src={course.image || undefined} alt={course.name} className={myCoursesStyles.courseImage} />
                            </div>

                            <div className={myCoursesStyles.courseContent}>
                                <h3 className={myCoursesStyles.courseName}>{course.name}</h3>

                                <div className={myCoursesStyles.infoContainer}>
                                    <div className={myCoursesStyles.ratingContainer}>
                                        {renderInteractiveStars(course)}
                                    </div>

                                    <div className={myCoursesStyles.teacherContainer}>
                                        <User className={myCoursesStyles.teacherIcon} />
                                        <span className={myCoursesStyles.teacherText}>{course.teacher}</span>
                                    </div>
                                </div>
                                <button className={myCoursesStyles.viewButton} onClick={(e) => { e.stopPropagation(); handleViewCourse(course.id) }}>
                                    <Play className={myCoursesStyles.buttonIcon} />
                                    <span>View Course</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{myCoursesCustomStyles}</style>
        </div>
    );
};

export default MyCourses;
