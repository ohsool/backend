import mongoose, { Schema, model, mongo } from "mongoose";

const BeerSchema: Schema = new Schema({
    name_korean: {
        type: String
    },
    name_english: {
        type: String
    },
    image: {
        type: String
    },
    degree: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BeerCategories",
        required: true
    },
    hashtag: {
        type: Array,
        default: []
    },
    features: {
        type: Object,
        default: {
            "bitter": 1,
            "crispy": 1,
            "flavor": 1,
            "sweet": 1,
            "nutty": 1
        }
    }
})

export default mongoose.model("Beers", BeerSchema);