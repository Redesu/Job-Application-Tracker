import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


export function generateTestToken(userId, overrides = {}) {
    const payload = {
        userId,
        username: 'testuser',
        name: 'Test User',
        ...overrides
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
}

