import mongoose, { Schema, model, mongo } from "mongoose";

const AlbtiSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("Albtis", AlbtiSchema);