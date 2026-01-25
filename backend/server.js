import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './config/db.js';
import courseRouter from './routes/courseRouter.js';
import bookingRouter from './routes/bookingRouter.js';
import badgeRouter from './routes/badgeRouter.js';

const app = express();
const port = process.env.PORT || 4000;


//MiddleWare
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://galaxo.onrender.com', 'https://galaxo-admin.onrender.com'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

app.use('/uploads', express.static('uploads'));

//DB
connectDB();
//Route
app.use('/api/course', courseRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/badge', badgeRouter);

//App port and listen

app.get('/', (req, res) => {
    res.send('API working');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});