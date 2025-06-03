import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({

    company: { type: String, required: true },
    position: { type: String, required: true },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});


export default mongoose.model('Job', JobSchema);