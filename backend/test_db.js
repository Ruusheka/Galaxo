
import mongoose from 'mongoose';
import 'dotenv/config';

const uri = process.env.MONGO_URI || 'mongodb+srv://ruushekas_db_user:A0oOjcvvo2SxzCoS@cluster0.vi4p53f.mongodb.net/LMS';

console.log(`Trying to connect to: ${uri}`);

mongoose.connect(uri)
    .then(() => {
        console.log('DB Connection SUCCESS');
        process.exit(0);
    })
    .catch((err) => {
        console.error('DB Connection FAILED:', err.message);
        process.exit(1);
    });
