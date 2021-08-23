import mongoose from "mongoose";

export interface IComplaint {
    _id?: mongoose.Types.ObjectId,
    title: String,
    description: String,
    userId?: mongoose.Types.ObjectId,
    date: String
}