import express from 'express'
const router = express.Router()

router.post('/handle-github-login', (req, res) => {
    console.log('github-data: ', req.body);
    res.json({success: true})
});

export default router;