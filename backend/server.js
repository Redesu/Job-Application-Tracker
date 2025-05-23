import express from 'express';
import connectDB from './utils/dbConnect';
import jobRoutes from './routes/jobs';

const app = express();

app.use(express.json());
app.use('/api/jobs', jobRoutes);

connectDB.then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
});