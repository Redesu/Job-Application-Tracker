import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server.js'
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
    await mongoose.disconnect();

    process.exit(0);
});

export { chai, expect, app };