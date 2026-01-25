import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb+srv://ruushekas_db_user:A0oOjcvvo2SxzCoS@cluster0.vi4p53f.mongodb.net/LMS';
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};
