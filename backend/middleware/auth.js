import jwt from 'jsonwebtoken';

export function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if(err.name === 'TokenExpiredError'){
                return res.status(401).json({ 
                    error: 'Token expired',
                    code: 'TOKEN_EXPIRED'
                 });
            }
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = { userId: decoded.userId };
        next();
    });
}