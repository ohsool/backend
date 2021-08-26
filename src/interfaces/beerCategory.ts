import mongoose from "mongoose";

export interface IAvgRate {
    [key: string]: Array<number>
}

interface IFeatures {
    [key: string]: Number
}

export interface IBeerCategory {
    _id?: mongoose.Types.ObjectId,
    name: String,
    image: String,
    features: IFeatures,
    title: String,
    description: String,
    avgRate: IAvgRate,
    preferenceCount?: number
}