import mongoose, { Schema, model, mongo } from "mongoose";

const BeerCategorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    features: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // 0: avgRate, 1: count
    avgRate: {
        type: Object,
        default: {
            "American Lager": [0, 0],
            "Pilsner": [0, 0],
            "Pale Ale": [0, 0],
            "IPA": [0, 0],
            "Weizen": [0, 0],
            "Dunkel": [0, 0],
            "Stout": [0, 0],
            "Bock": [0, 0],
            "Unknown": [0, 0]
        }
    }
});

export default mongoose.model("BeerCategories", BeerCategorySchema);