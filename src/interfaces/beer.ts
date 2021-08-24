import mongoose, { Document } from "mongoose";

export interface IFeatures {
    [key: string]: Number
}

export interface IBeer {
    _id?: mongoose.Types.ObjectId,
    name_korean: String,
    name_english: String,
    image: String,
    degree: Number,
    country: String,
    isDistant: Boolean,
    categoryId: mongoose.Types.ObjectId,
    hashtag: Array<String>,
    like_array?: Array<mongoose.Types.ObjectId>,
    features: IFeatures,
    count?: Number, 
    avgRate?: Number,
    location?: Array<Array<String>>,
    location_report?: Array<Array<String>>,
    createDate: String
}