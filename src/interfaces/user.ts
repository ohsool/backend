import mongoose from "mongoose";

export interface IUser {
    _id?: mongoose.Schema.Types.ObjectId,
    email?: String,
    nickname: String,
    password: String,
    preference: String,
    image: String,
    passport?: Array<Object>,
    refreshToken?: String
}