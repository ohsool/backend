import mongoose, { Schema, model, mongo } from "mongoose";

const CommentSchema: Schema = new Schema({
    drink: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drink",
        required: true
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String
    },
    date: {
        type: String,
        required: true
    },
    like_array: {
        type: Array,
        default: []
    },
    tagged_array: {
        type: Array,
        default: []
    },
    edited: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Comments", CommentSchema);