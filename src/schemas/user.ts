import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/user";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  follow_list: {
    type: Array,
    default: [],
  },
  follower_list: {
    type: Array,
    default: [],
  },
  is_public: {
    type: Boolean,
    default: true,
  },
  preference: {
    type: String,
    default: "Unknown",
  },
  image: {
    type: String,
    default:
      "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/default.png",
  },
  passport: {
    type: Array,
  },
  refreshToken: {
    type: String,
  },
});

export default mongoose.model<IUser & Document>("Users", UserSchema);
