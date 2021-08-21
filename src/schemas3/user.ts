import mongoose, { Schema, model, mongo } from "mongoose";

const UserSchema: Schema = new Schema({
    email: {
        type: String
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    preference: {
        type: String,
        default: "Unknown"
    },
    image: {
        type: String,
        default: "https://ohsool-storage.s3.ap-northeast-2.amazonaws.com/beerIcon/default.png"
    },
    passport: {
        type: Array
    },
    refreshToken: {
        type: String
    }
});

export default mongoose.model("Users", UserSchema);