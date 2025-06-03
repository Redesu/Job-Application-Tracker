import express from 'express';
import Job from '../models/Job.js';
import { verifyJWT } from '../middleware/auth.js';
const router = express.Router();

router.use(verifyJWT);

router.get('/', verifyJWT, async (req, res) => {
    try {
        const jobs = await Job.find({ userId: req.user.userId });
        res.status(200).json(jobs);
        console.log('User ' + req.user.userId + ' requested jobs')
        console.log(jobs);
    } catch (err) {
        res.status(401).json({ error: err.message });
        console.log('User ' + req.user.userId + ' requested jobs but faileds')
    }
})

router.post('/', verifyJWT, async (req, res) => {

    try {
        const job = await Job.create({
            ...req.body,
            createdBy: req.user.userId,
            userId: req.user.userId
        });
        await job.save();
        console.log('User ' + req.user.userId + ' created job')
        console.log(job);
        res.status(201).json(job);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

export default router;