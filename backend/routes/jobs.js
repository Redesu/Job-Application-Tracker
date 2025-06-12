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

router.get('/:id', verifyJWT, async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.params.id, userId: req.user.userId });
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
        console.log('User ' + req.user.userId + ' requested job with id ' + req.params.id)
        console.log(job);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

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


router.patch('/:id', verifyJWT, async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            {_id: req.params.id, userId: req.user.userId},
            req.body,
            { new: true }
        );
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
        console.log('User ' + req.user.userId + ' updated job')
        console.log(job);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

router.delete('/:id', verifyJWT, async (req, res) => {
    try{
        const job = await Job.findByIdAndDelete({_id: req.params.id, userId: req.user.userId});
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
        console.log('User ' + req.user.userId + ' deleted job')
        console.log(job);
    } catch (err) {
        res.status(401).json({ error: err.message });
    };
})

export default router;