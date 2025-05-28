import 'dotenv/config';
import express from 'express';
import connectDB from './utils/dbConnect.js';
import jobRoutes from './routes/jobs.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use('/api/jobs', jobRoutes);

(async () => {
    try {
        await connectDB();
        app.listen(5000, () => console.log('Server is running on port 5000'));
    } catch (err) {
        console.error(err);
    }
})()