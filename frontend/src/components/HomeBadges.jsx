import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Award, Sparkles } from 'lucide-react';

const homeBadgeStyles = {
    container: "py-24 bg-[#05050A] relative overflow-hidden",
    glow: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none",
    wrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10",
    header: "text-center mb-16",
    title: "text-4xl md:text-5xl font-bold text-white mb-6 font-orbiter tracking-wide",
    subtitle: "text-slate-400 font-exo max-w-2xl mx-auto text-lg",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
    card: "group relative bg-[#0A0A0F] border border-white/5 hover:border-amber-500/30 rounded-3xl p-8 flex flex-col items-center gap-6 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] overflow-hidden",
    shine: "absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none",
    iconContainer: "w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-900/10 border border-amber-500/20 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden",
    iconGlow: "absolute inset-0 bg-amber-500 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500",
    cardTitle: "text-lg font-bold text-white text-center font-orbiter tracking-wide group-hover:text-amber-400 transition-colors",
    cardStats: "text-xs text-slate-500 font-exo uppercase tracking-widest",
    cardTier: "absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-[#05050A] bg-amber-500 px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0",
    emptyState: "text-center py-12 bg-white/5 rounded-2xl border border-white/5",
    emptyText: "text-slate-400 font-exo",
};

const API_BASE = "http://localhost:4000";

const HomeBadges = () => {
    const { user, isSignedIn } = useUser();
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        if (!isSignedIn || !user) return;

        const fetchBadges = async () => {
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
        fetchBadges();
    }, [isSignedIn, user]);

    if (!isSignedIn || badges.length === 0) return null;

    return (
        <section className={homeBadgeStyles.container}>
            <div className={homeBadgeStyles.glow} />

            <div className={homeBadgeStyles.wrapper}>
                <div className={homeBadgeStyles.header}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
                        <Sparkles className="w-3 h-3" />
                        Achievements
                    </div>
                    <h2 className={homeBadgeStyles.title}>
                        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-600">Legendary</span> Collection
                    </h2>
                    <p className={homeBadgeStyles.subtitle}>
                        Showcase your mastery. Every completed course adds a new jewel to your crown.
                    </p>
                </div>

                <div className={homeBadgeStyles.grid}>
                    {badges.map((badge, idx) => (
                        <div key={badge._id || idx} className={homeBadgeStyles.card}>
                            {/* Shine Effect */}
                            <div className={homeBadgeStyles.shine} />

                            {/* Floating Tier Label */}
                            <span className={homeBadgeStyles.cardTier}>Gold</span>

                            <div className={homeBadgeStyles.iconContainer}>
                                <div className={homeBadgeStyles.iconGlow} />
                                <Award className="w-10 h-10 text-amber-500 group-hover:text-amber-200 transition-colors" strokeWidth={1.5} />
                            </div>

                            <div className="text-center">
                                <h3 className={homeBadgeStyles.cardTitle}>{badge.courseName}</h3>
                                <p className="text-xs text-slate-500 mt-2 font-mono">
                                    EARNED ON {new Date(badge.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="w-full mt-auto pt-6 border-t border-white/5 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                                <span className={homeBadgeStyles.cardStats}>VERIFIED</span>
                                <Sparkles className="w-4 h-4 text-amber-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeBadges;
