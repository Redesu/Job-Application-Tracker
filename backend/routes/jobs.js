import express from 'express';
import Job from '../models/Job.js';
import { verifyJWT } from '../middleware/auth.js';
const router  = express.Router();

router.use(verifyJWT);
router.post('/', async(req, res) => {
    
    try{
        const job = await Job.create({
            ...req.body,
            createdBy: req.user.userId
        });
        res.status(201).json(job);
    } catch(err){
        res.status(401).json({error: err.message});
    }
});

export default router;