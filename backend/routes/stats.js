import express from 'express'
import Job from '../models/Job.js'
import { verifyJWT } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyJWT, async (req, res) => {
    try {
        const userId = req.user.userId;
        const totalApplications = await Job.countDocuments({ userId });
        const totalInterviews = await Job.countDocuments({ userId, status: 'Interview' });
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const weeklyApplications = await Job.countDocuments({
            userId,
            status: 'Applied',
            createdAt: { $gte: oneWeekAgo },
        }); 

        const weeklyInterviews = await Job.countDocuments({
            userId,
            status: 'Interview',
            createdAt: { $gte: oneWeekAgo },
        });

        res.json({
            totalApplications,
            totalInterviews,
            weeklyApplications,
            weeklyInterviews,
            pendingInterviews: totalInterviews
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;