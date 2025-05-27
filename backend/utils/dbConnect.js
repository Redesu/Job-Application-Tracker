import mongoose from "mongoose";
import 'dotenv/config';
export default async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
