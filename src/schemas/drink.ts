import mongoose, { Schema, model, mongo } from "mongoose";

const DrinkSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    degree: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DrinkCategory",
        required: true
    }
})

export default mongoose.model("Drinks", DrinkSchema);