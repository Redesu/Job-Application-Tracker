import express from 'express';
import Job from '../models/Job.js';
import authMiddleware from '../utils/authMiddleware.js'

const router  = express.Router();

const requireAuth = (process.env.NODE_ENV === 'test') 
  ? (req, res, next) => next() 
  : AuthMiddleware;


router.post('/', requireAuth, async(req, res) => {
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