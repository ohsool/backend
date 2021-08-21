import mongoose from "mongoose";

export interface IBeerCategory {
    _id?: mongoose.Schema.Types.ObjectId,
    name: String,
    image: String,
    features: Object,
    title: String,
    description: String,
    avgRate: Object
}