import { chai, expect, app } from './setup.test.js';
import { request } from 'chai-http';
import User from '../models/User.js';

describe('Authentication API', () => {

    beforeEach(async () => {
        // Clear users collection before each test
        await User.deleteMany({});
    });

    describe('POST /auth/handle-github-login', () => {
        it('should create a new user and return a token', async () => {
            const githubUser = {
                githubId: '123456',
                login: 'testuser',
                name: 'Test User',
                avatarUrl: 'http://example.com/avatar.jpg',
                profileUrl: 'http://example.com/profile'
            };

            const res = await request.execute(app)
                .post('/auth/handle-github-login')
                .send(githubUser);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
        });
    });
});

