import Beers from "../schemas/beer";
import mongoose from "mongoose";

export interface IBeer {
    _id?: mongoose.Schema.Types.ObjectId,
    name_korean: String,
    name_english: String,
    image: String,
    degree: Number,
    categoryId: mongoose.Schema.Types.ObjectId,
    hashtag: Array<String>,
    like_array?: Array<mongoose.Schema.Types.ObjectId>,
    features: Object,
    count?: Number,
    avgRate?: Number,
    location?: Array<Array<String>>,
    location_report?: Array<Array<String>>,
    createDate: String
}