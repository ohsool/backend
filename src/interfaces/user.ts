import mongoose from "mongoose";

interface IPassport {
  [key: string]: string;
}

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  email?: string;
  nickname: string;
  password: string;
  description: string;
  follow_list?: Array<mongoose.Types.ObjectId>;
  follower_list?: Array<mongoose.Types.ObjectId>;
  is_public?: boolean;
  preference: string;
  image: string;
  passport?: Array<IPassport>;
  refreshToken?: string;
}
