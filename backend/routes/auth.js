// backend/routes/auth.js
import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/handle-github-login', async (req, res) => {
  try {
    const { githubId, login, name, avatarUrl, profileUrl } = req.body;
    let user = await User.findOne({ githubId });

    if (!user) {
      user = await User.create({
        githubId,
        login,
        name,
        avatarUrl,
        profileUrl
      });
    }
    const token = jwt.sign(
      { userId: user._id, username: login, name },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    )

    res.json({
      success: true,
      token,
      userId: user._id,
    });


  } catch (error) {
    console.error("Error in GitHub login handler:", error);
    res.status(500).json({ success: false });
  }
});

export default router;