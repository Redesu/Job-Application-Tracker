import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../src/app.js';
import mongoose from 'mongoose';

chai.use(chaiHttp);
const { expect } = chai;

// test hooks

before(async () => {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

after(async () => {
    // Disconnect from the database
    await mongoose.connection.close();
});

export { chai, expect, app };