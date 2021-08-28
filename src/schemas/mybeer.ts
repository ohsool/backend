import mongoose, { Schema, Document } from "mongoose";
import { IMyBeer } from "../interfaces/mybeer";

const MyBeerSchema: Schema = new Schema({
    beerId: {
        type: mongoose.Types.ObjectId,
        ref: "Beers",
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    preference: {
        type: String,
        required: true
    },
    like_array: {
        type: Array,
        default: []
    },
    myFeatures: {
        type: Object,
        default: {
            "bitter": 1,
            "crispy": 1,
            "flavor": 1,
            "sweet": 1,
            "nutty": 1
        }
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    rate: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    like_count: {
        type: Number,
        default: 0
    }
});

export default mongoose.model<IMyBeer & Document>("MyBeers", MyBeerSchema);