import 'dotenv/config';
import express from 'express';
import connectDB from './utils/dbConnect.js';
import jobRoutes from './routes/jobs.js';
import cors from 'cors';
import { verifyJWT } from './middleware/auth.js';
import auth from './routes/auth.js';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use('/api/jobs', verifyJWT, jobRoutes);
app.use('/auth', auth);

(async () => {
    try {
        await connectDB();
        app.listen(5000, () => console.log('Server is running on port 5000'));
    } catch (err) {
        console.error(err);
    }
})()