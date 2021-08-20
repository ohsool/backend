import mongoose, { Schema } from "mongoose";

const ComplaintSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    date: {
        type: String,
        required: true
    }
});

export default mongoose.model("Complaints", ComplaintSchema);