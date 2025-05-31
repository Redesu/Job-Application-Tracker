import jwt from 'jsonwebtoken';

export function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("JWT verification failed: ", err);
            return res.status(403).json({ error: 'Forbidden' }); // 403 is more appropriate for invalid tokens
        }
         console.log('Decoded JWT:', decoded);
        req.user = { userId: decoded.userId };
        next();
    });
}