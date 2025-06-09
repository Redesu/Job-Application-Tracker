import express from "express";
import Job from "../models/Job.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // const totalUsers = await User.countDocuments();
        const totalUsers = Math.floor(Math.random() * 100);
        // const totalApplications = await Job.countDocuments();
        const totalApplications = Math.floor(Math.random() * 1000);
        const weeklyUsersChange = Math.floor(Math.random() * 1000);
        const weeklyInterviewsChange = Math.floor(Math.random() * 200);
        res.json({ totalUsers, totalApplications, weeklyUsersChange, weeklyInterviewsChange });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;