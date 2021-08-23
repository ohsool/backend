import mongoose from "mongoose";

interface IPassport {
    [key: string]: string
}

export interface IUser {
    _id?: mongoose.Types.ObjectId,
    email?: String,
    nickname: String,
    password: String,
    preference: String,
    image: String,
    passport?: Array<IPassport>,
    refreshToken?: String
}