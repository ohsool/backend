import mongoose from "mongoose";

interface IFeatures {
    [key: string]: Number
}

export interface IBeer {
    _id?: mongoose.Schema.Types.ObjectId,
    name_korean: String,
    name_english: String,
    image: String,
    degree: Number,
    categoryId: mongoose.Schema.Types.ObjectId,
    hashtag: Array<String>,
    like_array?: Array<mongoose.Schema.Types.ObjectId>,
    features: IFeatures,
    count?: Number,
    avgRate?: Number,
    location?: Array<Array<String>>,
    location_report?: Array<Array<String>>,
    createDate: String
}