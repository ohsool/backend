import mongoose, { Document } from "mongoose";

export interface IFeatures {
    [key: string]: number
}

export interface IBeer {
    _id?: mongoose.Types.ObjectId,
    name_korean: string,
    name_english: string,
    image: string,
    degree: number,
    country: string,
    isDistant: boolean,
    categoryId: mongoose.Types.ObjectId,
    hashtag: Array<string>,
    like_array?: Array<mongoose.Types.ObjectId>,
    features: IFeatures,
    count?: number, 
    avgRate?: number,
    location?: Array<Array<string>>,
    location_report?: Array<Array<string>>,
    createDate: string
}