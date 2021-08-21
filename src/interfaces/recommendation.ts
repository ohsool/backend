import mongoose from "mongoose";

export interface IRecommendation {
    _id?: mongoose.Schema.Types.ObjectId,
    beer: String,
    description: String,
    image?: String,
    userId?: mongoose.Schema.Types.ObjectId,
    date: String
}