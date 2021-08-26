import mongoose from "mongoose";

interface IPassport {
    [key: string]: string
}

export interface IUser {
    _id?: mongoose.Types.ObjectId,
    email?: string,
    nickname: string,
    password: string,
    preference: string,
    image: string,
    passport?: Array<IPassport>,
    refreshToken?: string
}