import 'dotenv/config';
import express from 'express';
import connectDB from './utils/dbConnect.js';
import jobRoutes from './routes/jobs.js';

const app = express();
app.use(express.json());
app.use('/api/jobs', jobRoutes);

(async () => {
    try {
        await connectDB();
        app.listen(3000, () => console.log('Server is running on port 3000'));
    } catch (err) {
        console.error(err);
    }
})()