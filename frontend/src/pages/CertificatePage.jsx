import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, CheckCircle, Download, Share2, ShieldCheck, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

const CertificatePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [badge, setBadge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState(null);
    const certificateRef = useRef(null);

    const API_BASE = 'https://galaxo-backend.onrender.com';

    useEffect(() => {
        const fetchBadge = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/badge/${id}`);
                if (!res.ok) {
                    setError("Certificate not found");
                    return;
                }
                const data = await res.json();
                if (data.success) {
                    setBadge(data.badge);
                } else {
                    setError(data.message || "Certificate not found");
                }
            } catch (err) {
                setError("Failed to verify certificate");
            } finally {
                setLoading(false);
            }
        };
        fetchBadge();
    }, [id]);

    const handleDownload = async () => {
        if (!certificateRef.current) return;
        setDownloading(true);
        try {
            const canvas = await html2canvas(certificateRef.current, {
                backgroundColor: "#05050A",
                scale: 2,
                useCORS: true,
                logging: false
            });
            const link = document.createElement('a');
            link.download = `Galaxo-Certificate-${badge?.studentName || 'Student'}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (e) {
            console.error("Download failed", e);
            alert("Download failed. Please try again.");
        } finally {
            setDownloading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#05050A] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
                    <p className="text-slate-400">Verifying certificate...</p>
                </div>
            </div>
        );
    }

    if (error || !badge) {
        return (
            <div className="min-h-screen bg-[#05050A] flex items-center justify-center text-white p-4">
                <div className="max-w-md text-center">
                    <ShieldCheck className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-2">Certificate Not Found</h1>
                    <p className="text-slate-400 mb-6">
                        We couldn't verify this certificate ID. It may be invalid or have been removed.
                    </p>
                    <a href="/" className="text-amber-500 hover:text-amber-400 underline">Return to Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05050A] text-white flex flex-col items-center py-10 px-4">
            {/* Navbar / Header */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-10 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center font-bold text-white">G</div>
                    <span className="font-orbiter font-bold text-xl tracking-wider">GALAXO</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-500/20">
                    <ShieldCheck size={14} />
                    <span>Verified Certificate</span>
                </div>
            </div>

            {/* Main Certificate Display */}
            <div className="w-full max-w-3xl relative">

                {/* The Certificate Card (Target for HTML2Canvas) */}
                <div
                    ref={certificateRef}
                    style={{
                        position: "relative",
                        backgroundColor: "#09090E",
                        border: "1px solid rgba(245, 158, 11, 0.2)",
                        borderRadius: "16px",
                        padding: "48px",
                        textAlign: "center",
                        overflow: "hidden",
                        boxShadow: "0 0 100px rgba(245, 158, 11, 0.1)",
                        color: "#FFFFFF",
                        fontFamily: "ui-sans-serif, system-ui, sans-serif"
                    }}
                >
                    {/* Decorative Elements */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "8px",
                            background: "linear-gradient(90deg, #F59E0B, #FACC15, #D97706)"
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            width: "256px",
                            height: "256px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(245, 158, 11, 0.05)",
                            filter: "blur(80px)",
                            pointerEvents: "none"
                        }}
                    />

                    {/* Content */}
                    <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div
                            style={{
                                marginBottom: "32px",
                                padding: "16px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(245, 158, 11, 0.1)",
                                border: "1px solid rgba(245, 158, 11, 0.2)",
                                boxShadow: "0 0 10px rgba(245, 158, 11, 0.05)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Award size={64} color="#FBBF24" />
                        </div>

                        <h1
                            style={{
                                fontSize: "40px",
                                fontWeight: "bold",
                                margin: "0 0 16px 0",
                                letterSpacing: "0.05em",
                                color: "#FDE68A",
                                textShadow: "0 2px 4px rgba(0,0,0,0.5)"
                            }}
                        >
                            CERTIFICATE OF COMPLETION
                        </h1>

                        <p
                            style={{
                                fontSize: "18px",
                                color: "#94A3B8",
                                margin: "0 0 32px 0",
                                maxWidth: "500px"
                            }}
                        >
                            This is to certify that
                        </p>

                        <h2
                            style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "#FFFFFF",
                                margin: "0 0 24px 0",
                                paddingBottom: "16px",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                minWidth: "300px"
                            }}
                        >
                            {badge.studentName || "Student"}
                        </h2>

                        <p
                            style={{
                                fontSize: "18px",
                                color: "#94A3B8",
                                margin: "0 0 16px 0",
                                maxWidth: "600px"
                            }}
                        >
                            has successfully completed the course
                        </p>

                        <h3
                            style={{
                                fontSize: "28px",
                                fontWeight: "bold",
                                color: "#A78BFA",
                                margin: "0 0 40px 0"
                            }}
                        >
                            {badge.courseName}
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "32px",
                                width: "100%",
                                maxWidth: "600px",
                                paddingTop: "32px",
                                marginTop: "16px",
                                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                                textAlign: "left"
                            }}
                        >
                            <div>
                                <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px", color: "#64748B", margin: "0 0 4px 0" }}>Issue Date</p>
                                <p style={{ fontFamily: "monospace", color: "#FFFFFF", margin: 0, fontSize: "16px" }}>{new Date(badge.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px", color: "#64748B", margin: "0 0 4px 0" }}>Certificate ID</p>
                                <p style={{ fontFamily: "monospace", fontSize: "14px", color: "#FFFFFF", margin: 0 }}>{badge._id}</p>
                            </div>
                        </div>

                        <div style={{ marginTop: "48px", opacity: 0.5, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                            <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748B" }}>Authorized by Galaxo Platform</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 relative z-50">
                    <button
                        onClick={() => navigate('/mycourses')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <span>&larr; Go Back</span>
                    </button>

                    <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {downloading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Download size={20} />
                                Download PNG
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Link copied!");
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <Share2 size={20} />
                        Copy Link
                    </button>
                </div>

            </div>

            {/* Footer */}
            <div className="mt-16 text-slate-600 text-sm">
                &copy; {new Date().getFullYear()} Galaxo LMS. Verify at {window.location.origin}/certificate
            </div>
        </div>
    );
};

export default CertificatePage;
