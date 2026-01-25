import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true,
        index: true
    },
    courseId: {
        type: String, // Can be local ID or whatever ID system is used
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    badgeType: {
        type: String,
        enum: ["Gold", "Silver", "Bronze"],
        default: "Gold"
    },
    studentName: { type: String, default: "" },
    pricePaid: { type: Number, default: 0 },
    issuedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Prevent duplicate badges for same user/course
badgeSchema.index({ clerkUserId: 1, courseId: 1 }, { unique: true });

const Badge = mongoose.models.Badge || mongoose.model("Badge", badgeSchema);

export default Badge;
