import mongoose, { Schema, model, mongo } from "mongoose";

const MyBeerSchema: Schema = new Schema({
    beerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beers",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    myFeatures: {
        type: Object,
        default: {
            "bitter": 0,
            "crispy": 0,
            "flavor": 0,
            "sweet": 0,
            "nutty": 0
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
        type: String
    }
});

export default mongoose.model("MyBeers", MyBeerSchema);