import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Award, Download, X, Link as LinkIcon, Linkedin, Mail, Instagram, MessageCircle } from "lucide-react";
import html2canvas from "html2canvas";
import confetti from "canvas-confetti";

/**
 * BadgeModal Component
 * Displays a HackerRank-style popup when a user completes a course.
 */

const BadgeModal = ({ courseName, studentName, badgeId, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);
    const badgeRef = useRef(null);

    // Construct public certificate URL if ID exists
    const shareUrl = badgeId
        ? `${window.location.origin}/certificate/${badgeId}`
        : window.location.href;

    useEffect(() => {
        // Trigger entrance animation
        setTimeout(() => setIsVisible(true), 50);

        // Fire Golden Paper Confetti (HackerRank Style) from all 4 corners
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 45, spread: 90, ticks: 60, zIndex: 150 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 40 * (timeLeft / duration);

            // Top Left
            confetti({
                ...defaults,
                particleCount,
                origin: { x: 0, y: 0 },
                angle: -45, // Shoot down-right
                colors: ['#FFD700', '#FFA500', '#FFFFFF']
            });
            // Top Right
            confetti({
                ...defaults,
                particleCount,
                origin: { x: 1, y: 0 },
                angle: 225, // Shoot down-left
                colors: ['#FFD700', '#FFA500', '#FFFFFF']
            });
            // Bottom Left
            confetti({
                ...defaults,
                particleCount,
                startVelocity: 60, // Higher velocity to fight gravity
                origin: { x: 0, y: 1 },
                angle: 45, // Shoot up-right
                colors: ['#FFD700', '#FFA500', '#FFFFFF']
            });
            // Bottom Right
            confetti({
                ...defaults,
                particleCount,
                startVelocity: 60,
                origin: { x: 1, y: 1 },
                angle: 135, // Shoot up-left
                colors: ['#FFD700', '#FFA500', '#FFFFFF']
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const handleDownload = async () => {
        if (!badgeRef.current) return;
        try {
            const canvas = await html2canvas(badgeRef.current, {
                backgroundColor: "#05050A",
                scale: 2,
                logging: false,
                useCORS: true
            });

            const link = document.createElement("a");
            const safeStudentName = (studentName || "Student").replace(/[^a-z0-9]/gi, "_");
            const safeCourseName = courseName.split(" ")[0].replace(/[^a-z0-9]/gi, "");
            link.download = `Galaxo-Badge-${safeStudentName}-${safeCourseName}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
            return true; // Success
        } catch (err) {
            console.error("Download failed:", err);
            alert("Failed to download badge.");
            return false;
        }
    };

    const handleShare = async (platform) => {
        const url = window.location.href;
        const text = `I just earned the Master of ${courseName} badge on Galaxo! 🚀`;

        switch (platform) {
            case 'copy':
                navigator.clipboard.writeText(`${text} ${url}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
                break;
            case 'email':
                window.open(`mailto:?subject=${encodeURIComponent("Check out my new badge!")}&body=${encodeURIComponent(text + "\n\n" + url)}`, '_self');
                break;
            case 'instagram':
                // For IG, we download the image and prompt the user
                const success = await handleDownload();
                if (success) {
                    alert("Badge downloaded! You can now post it to your Instagram Stories/Feed.");
                }
                break;
            default:
                break;
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
            <div
                className={`relative w-full max-w-md bg-[#05050A] border border-amber-500/30 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden transform transition-all duration-700 ${isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10"
                    }`}
            >
                {/* Decorative background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors z-[200]"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center p-8 pt-12">

                    {/* Badge Card Wrapper for Capture */}
                    <div
                        ref={badgeRef}
                        className="p-8 rounded-xl flex flex-col items-center w-full"
                        style={{ backgroundColor: "#05050A", border: "1px solid #333" }}
                    >
                        {/* Static Icon for Capture */}
                        <div className="mb-6">
                            <div
                                className="p-6 rounded-full shadow-xl border-4"
                                style={{
                                    backgroundColor: "#F59E0B",
                                    borderColor: "#05050A",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Award size={64} color="#05050A" strokeWidth={2} />
                            </div>
                        </div>

                        <h2
                            className="text-3xl font-bold mb-2 font-orbiter"
                            style={{ color: "#FBBF24", textAlign: "center", background: "none", WebkitBackgroundClip: "border-box" }}
                        >
                            Congratulations!
                        </h2>

                        <p
                            className="mb-6 font-exo"
                            style={{ color: "#CBD5E1", textAlign: "center" }}
                        >
                            You have successfully completed <br />
                            <span style={{ color: "#FFFFFF", fontWeight: "600", fontSize: "1.125rem" }}>{courseName}</span>
                        </p>

                        <div
                            className="w-full rounded-xl p-4 mb-2"
                            style={{ backgroundColor: "#18181B", border: "1px solid #27272A" }}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span style={{ color: "#94A3B8", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Badge Earned</span>
                                <span style={{ color: "#FBBF24", fontSize: "0.75rem", fontWeight: "bold" }}>GOLD TIER</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
                                    style={{ backgroundColor: "#F59E0B" }}
                                >
                                    <Award size={24} color="#000000" />
                                </div>
                                <div className="text-left">
                                    <div style={{ color: "#FFFFFF", fontWeight: "bold", lineHeight: "1.25" }}>Master of {courseName.split(" ")[0]}</div>
                                    <div style={{ color: "#94A3B8", fontSize: "0.75rem" }}>Issued to {studentName}</div>
                                </div>
                            </div>
                            {/* Galaxo Branding */}
                            <div className="mt-4 pt-3 flex justify-between items-center" style={{ borderTop: "1px solid #27272A" }}>
                                <span className="font-exo" style={{ color: "#64748B", fontSize: "0.625rem" }}>Certified by</span>
                                <span className="font-orbiter" style={{ color: "#22D3EE", fontSize: "0.875rem", fontWeight: "bold", letterSpacing: "0.1em" }}>
                                    GALAXO
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full mt-6 space-y-4">
                        <button
                            onClick={handleDownload}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-[#05050A] font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-amber-500/30 active:scale-95"
                        >
                            <Download className="w-5 h-5" />
                            Download Certificate
                        </button>

                        <div className="flex items-center justify-center gap-3">
                            {/* Instagram */}
                            <button
                                onClick={() => handleShare('instagram')}
                                className="p-3 rounded-xl bg-[#05050A] border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 text-slate-400 hover:text-pink-500 transition-all active:scale-95 group"
                                title="Share on Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </button>

                            {/* LinkedIn */}
                            <button
                                onClick={() => handleShare('linkedin')}
                                className="p-3 rounded-xl bg-[#05050A] border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-slate-400 hover:text-blue-500 transition-all active:scale-95 group"
                                title="Share on LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </button>

                            {/* WhatsApp */}
                            <button
                                onClick={() => handleShare('whatsapp')}
                                className="p-3 rounded-xl bg-[#05050A] border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 text-slate-400 hover:text-green-500 transition-all active:scale-95 group"
                                title="Share on WhatsApp"
                            >
                                <MessageCircle className="w-5 h-5" />
                            </button>

                            {/* Email */}
                            <button
                                onClick={() => handleShare('email')}
                                className="p-3 rounded-xl bg-[#05050A] border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 text-slate-400 hover:text-purple-500 transition-all active:scale-95 group"
                                title="Share via Email"
                            >
                                <Mail className="w-5 h-5" />
                            </button>

                            {/* Copy Link */}
                            <button
                                onClick={() => handleShare('copy')}
                                className={`p-3 rounded-xl bg-[#05050A] border transition-all active:scale-95 group flex items-center gap-2 ${copied
                                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500"
                                    : "border-white/10 hover:border-white/30 hover:bg-white/5 text-slate-400 hover:text-white"
                                    }`}
                                title="Copy Link"
                            >
                                <LinkIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
};

export default BadgeModal;
