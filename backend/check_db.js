
import mongoose from 'mongoose';
import Course from './models/courseModel.js';

const checkDB = async () => {
    try {
        const uri = 'mongodb+srv://ruushekas_db_user:A0oOjcvvo2SxzCoS@cluster0.vi4p53f.mongodb.net/LMS';
        await mongoose.connect(uri);
        console.log("Connected to DB");
        const courses = await Course.find({}, { name: 1, courseType: 1 });
        console.log("Courses:", JSON.stringify(courses, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDB();
