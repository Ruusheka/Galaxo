import React, { useEffect, useState } from "react";
import { dashboardStyles } from "../assets/dummyStyles";
import axios from "axios";
import { Users, BookOpen, DollarSign, TrendingUp, Search, User, Play, Clock } from "lucide-react";

const DashboardPage = () => {
    const [courses, setCourses] = useState([]);
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalInstructors: 0,
        totalDuration: 0,
        totalRevenue: 0 // Placeholder
    });
    const [bookingStats, setBookingStats] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        bookingLast7Days: 0
    });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const API_BASE = "http://localhost:4000";

    // Helper to parse duration (same as ListPage)
    const parseDuration = (v) => {
        if (v == null) return 0;
        if (typeof v === "number" && Number.isFinite(v)) return Math.max(0, Math.floor(v));
        if (typeof v === "string") {
            const s = v.trim();
            const plain = parseInt(s.replace(/[^\d-]/g, ""), 10);
            if (Number.isFinite(plain)) return Math.max(0, plain);
            return 0;
        }
        return 0;
    };

    const formatMinutes = (mins) => {
        const m = Math.max(0, Math.floor(Number(mins) || 0));
        const h = Math.floor(m / 60);
        const rem = m % 60;
        if (h === 0) return `${rem}m`;
        if (rem === 0) return `${h}h`;
        return `${h}h ${rem}m`;
    };

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Fetch courses for stats
            const res = await axios.get(`${API_BASE}/api/course/public`);
            let arr = [];
            // Logic from ListPage to handle variations
            let raw = res.data;
            if (raw && raw.data) raw = raw.data;
            if (Array.isArray(raw)) arr = raw;
            else if (raw && Array.isArray(raw.items)) arr = raw.items;
            else if (raw && Array.isArray(raw.courses)) arr = raw.courses;

            setCourses(arr);

            // Calculate Stats
            const uniqueInstructors = new Set(arr.map(c => c.teacher || c.instructor).filter(Boolean)).size;
            const totalMins = arr.reduce((acc, c) => acc + parseDuration(c.totalDuration || c.duration), 0);

            setStats({
                totalCourses: arr.length,
                totalInstructors: uniqueInstructors,
                totalDuration: totalMins,
                totalRevenue: 0
            });

            // Fetch Booking Stats
            try {
                const bookingRes = await axios.get(`${API_BASE}/api/booking/stats`);
                if (bookingRes.data && bookingRes.data.success) {
                    setBookingStats(bookingRes.data.stats);
                }
            } catch (bErr) {
                console.error("Failed to fetch booking stats", bErr);
            }

        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const filteredCourses = courses.filter(c =>
        (c.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.teacher || c.instructor || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={dashboardStyles.pageContainer}>
            <div className={dashboardStyles.backgroundPattern} />

            <div className={dashboardStyles.contentContainer}>
                {/* Header */}
                <div className={dashboardStyles.headerContainer}>
                    <h1 className={dashboardStyles.headerTitle}>Dashboard Overview</h1>
                    <p className={dashboardStyles.headerSubtitle}>Welcome back! Here's what's happening today.</p>
                </div>

                {/* Stats Grid */}
                <div className={dashboardStyles.statsGrid}>
                    {/* Stat 1 */}
                    <div className={dashboardStyles.statCard}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className={dashboardStyles.statTitle}>Total Courses</h3>
                                <p className={dashboardStyles.statValue}>{stats.totalCourses}</p>
                            </div>
                            <div className={dashboardStyles.statIconContainer("bg-blue-500")}>
                                <BookOpen className={dashboardStyles.statIcon} />
                            </div>
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div className={dashboardStyles.statCard}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className={dashboardStyles.statTitle}>Instructors</h3>
                                <p className={dashboardStyles.statValue}>{stats.totalInstructors}</p>
                            </div>
                            <div className={dashboardStyles.statIconContainer("bg-purple-500")}>
                                <User className={dashboardStyles.statIcon} />
                            </div>
                        </div>
                    </div>

                    {/* Stat 3 - Changed to Total Enrollment */}
                    <div className={dashboardStyles.statCard}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className={dashboardStyles.statTitle}>Total Enrollment</h3>
                                <p className={dashboardStyles.statValue}>{bookingStats.totalBookings}</p>
                            </div>
                            <div className={dashboardStyles.statIconContainer("bg-green-500")}>
                                <Users className={dashboardStyles.statIcon} />
                            </div>
                        </div>
                    </div>

                    {/* Stat 4 */}
                    <div className={dashboardStyles.statCard}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className={dashboardStyles.statTitle}>Total Revenue</h3>
                                <p className={dashboardStyles.statValue}>${bookingStats.totalRevenue}</p>
                            </div>
                            <div className={dashboardStyles.statIconContainer("bg-orange-500")}>
                                <DollarSign className={dashboardStyles.statIcon} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Courses Table */}
                <div className={dashboardStyles.coursesContainer}>
                    <div className={dashboardStyles.coursesHeader}>
                        <div className={dashboardStyles.coursesTitleContainer}>
                            <Play className={dashboardStyles.coursesIcon} />
                            <h2 className={dashboardStyles.coursesTitle}>Recent Courses</h2>
                        </div>

                        <div className={dashboardStyles.searchContainer}>
                            <Search className={dashboardStyles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className={dashboardStyles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={dashboardStyles.tableContainer}>
                        <table className={dashboardStyles.table}>
                            <thead className={dashboardStyles.tableHead}>
                                <tr>
                                    <th className={dashboardStyles.tableHeader}>Course Name</th>
                                    <th className={dashboardStyles.tableHeader}>Lectures</th>
                                    <th className={dashboardStyles.tableHeader}>Price</th>
                                    <th className={dashboardStyles.tableHeader}>Status</th>
                                </tr>
                            </thead>
                            <tbody className={dashboardStyles.tableBody}>
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
                                ) : filteredCourses.length === 0 ? (
                                    <tr><td colSpan="4" className={dashboardStyles.emptyState}>No courses found</td></tr>
                                ) : (
                                    filteredCourses.map((course, index) => (
                                        <tr key={course._id || course.id || index} className={dashboardStyles.tableRow}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img className={dashboardStyles.courseImage} src={
                                                            course.image && course.image.startsWith("http") ? course.image :
                                                                course.image ? `${API_BASE}/uploads/${course.image}` : "https://via.placeholder.com/40"
                                                        } alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className={dashboardStyles.courseName}>{course.name}</div>
                                                        <div className={dashboardStyles.courseInstructor}>{course.teacher || course.instructor}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={dashboardStyles.studentsCell}>
                                                <div className={dashboardStyles.studentsText}>{course.lectures ? course.lectures.length : (course.courseLectures?.length || 0)} Lectures</div>
                                            </td>
                                            <td className={dashboardStyles.priceCell}>
                                                {course.price && (typeof course.price === 'object' ? `$${course.price.sale}` : `$${course.price}`)}
                                                {(!course.price || course.price === 0) && <span className="text-green-600">Free</span>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${course.courseType === 'top' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                                                    {course.courseType === 'top' ? 'Top Course' : 'Active'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
