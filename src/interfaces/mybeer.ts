import mongoose from "mongoose";

interface IFeatures {
    [key: string]: Number
}

export interface IMyBeer {
    _id?: mongoose.Schema.Types.ObjectId,
    beerId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    preference: String,
    myFeatures: IFeatures,
    
}