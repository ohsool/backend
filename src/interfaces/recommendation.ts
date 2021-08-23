import mongoose from "mongoose";

export interface IRecommendation {
    _id?: mongoose.Types.ObjectId,
    beer: String,
    description: String,
    image?: String,
    userId?: mongoose.Types.ObjectId,
    date: String
}