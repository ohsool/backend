import mongoose from "mongoose";

interface BeerCategory {
    _id?: mongoose.Schema.Types.ObjectId,
    name: String,
    image: String,
    features: Object,
    title: String,
    description: String,
    avgRate: Object
}