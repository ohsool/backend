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
    passport: {
        type: Array
    },
    refreshToken: {
        type: String
    }
});

export default mongoose.model("Users", UserSchema);