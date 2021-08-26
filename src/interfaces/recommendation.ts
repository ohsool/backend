import mongoose from "mongoose";

export interface IRecommendation {
    _id?: mongoose.Types.ObjectId,
    beer: string,
    description: string,
    image?: string,
    userId?: mongoose.Types.ObjectId,
    date: string
}