import mongoose from "mongoose";

interface IFeatures {
    [key: string]: Number
}

export interface IMyBeer {
    _id?: mongoose.Types.ObjectId,
    beerId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    preference: String,
    myFeatures: IFeatures,
    date: String,
    location?: String,
    rate: Number,
    review: String
}