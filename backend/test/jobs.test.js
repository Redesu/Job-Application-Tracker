// test/jobs.test.js
import { chai, expect, app } from './setup.test.js';
import { request } from 'chai-http';
import { generateTestToken } from './generateTestToken.js';
import Job from '../models/Job.js';

// Generate a test token for authenticated requests
const validTestToken = generateTestToken('testUserId123', {
    username: 'testuser',
    name: 'Test User'
});

describe('Jobs API', () => {
    beforeEach(async () => {
        // Clear jobs collection before each test
        await Job.deleteMany({});
    });

    describe('GET /api/jobs', () => {
        it('should return all jobs for authenticated user', async () => {
            // 1. Create test user and jobs
            const testJob = await Job.create({
                company: 'Test Co',
                position: 'Developer',
                status: 'Applied',
                userId: 'testUserId123'
            });

            // 2. Make authenticated request
            const res = await request.execute(app)
                .get('/api/jobs')
                .set('Authorization', `Bearer ${validTestToken}`);

            // 3. Assertions
            expect(res).to.have.status(200);
            expect(res.body.jobs).to.be.an('array');
            expect(res.body.jobs[0].company).to.equal(testJob.company);
        });

        it('should return 401 for unauthenticated requests', async () => {
            const res = await request.execute(app)
                .get('/api/jobs');

            expect(res).to.have.status(401);
        });
    });

    describe('POST /api/jobs', () => {
        it('should create a new job', async () => {
            const newJob = {
                company: 'New Company',
                position: 'Senior Developer',
                status: 'Interview'
            };

            const res = await request.execute(app)
                .post('/api/jobs')
                .set('Authorization', `Bearer ${validTestToken}`)
                .send(newJob);

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('_id');
            expect(res.body.company).to.equal(newJob.company);
        });
    });
});