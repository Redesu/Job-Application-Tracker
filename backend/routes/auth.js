// backend/routes/auth.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/handle-github-login', async (req, res) => {
  try {
    const { githubId, login, name, avatarUrl, profileUrl } = req.body;

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

    // Return minimal needed data to frontend
    res.json({ 
      success: true,
      userId: user._id 
    });

  } catch (error) {
    console.error("Error in GitHub login handler:", error);
    res.status(500).json({ success: false });
  }
});

export default router;