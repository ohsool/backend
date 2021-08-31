import mongoose, { Schema, Document } from "mongoose";
import { IRecommendation } from "../interfaces/recommendation";

const RecommendationSchema: Schema = new Schema({
  beer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  date: {
    type: String,
    required: true,
  },
  isSolved: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IRecommendation & Document>(
  "Recommendations",
  RecommendationSchema
);

// import mongoose, { Schema } from "mongoose";

// const RecommendationSchema: Schema = new Schema({
//     beer: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String
//     },
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Users"
//     },
//     date: {
//         type: String,
//         required: true
//     }
// });

// export default mongoose.model("Recommendations", RecommendationSchema);
