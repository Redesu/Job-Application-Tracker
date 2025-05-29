// backend/routes/auth.js
import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/handle-github-login', async (req, res) => {
  try {
    const { githubId, login, name, avatarUrl, profileUrl } = req.body;



    const token = jwt.sign(
        { userId: githubId, username: login, name },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    // Check if user exists
    let user = await User.findOne({ githubId });

    // Create new user if doesn't exist
    if (!user) {
      user = await User.create({
        githubId,
        login,
        name,
        avatarUrl,
        profileUrl
      });
    }
    console.log('github login successful for user: ', user);
    // Return minimal needed data to frontend
    res.json({ 
      success: true,
      token
    });

  } catch (error) {
    console.error("Error in GitHub login handler:", error);
    res.status(500).json({ success: false });
  }
});

export default router;