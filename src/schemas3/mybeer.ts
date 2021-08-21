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
    preference: {
        type: String,
        required: true
    }
    ,
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
        type: String
    }
});

export default mongoose.model("MyBeers", MyBeerSchema);