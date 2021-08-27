import mongoose from "mongoose";

interface IFeatures {
    [key: string]: number
}

export interface IMyBeer {
    _id?: mongoose.Types.ObjectId,
    beerId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    preference: string,
    myFeatures: IFeatures,
    like_array?: Array<mongoose.Types.ObjectId>,
    date: string,
    location?: string,
    rate: number,
    review: string
}