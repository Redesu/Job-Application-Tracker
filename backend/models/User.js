import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    githubId: {type: String, required: true, unique: true},
    login: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    avatarUrl: {type: String, required: true},
    profileUrl:{type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    }
})