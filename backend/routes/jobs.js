import express from 'express';
import Job from '../models/Job';
import authMiddleware from '../utils/authMiddleware'

const router  = express.Router();

router.post('/', authMiddleware, async(req, res) => {
    try{
        const job = await Job.create({
            ...req.body,
            createdBy: req.user._id
        });
        res.status(201).json(job);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

export default router;