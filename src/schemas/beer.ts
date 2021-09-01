import mongoose, { Schema, Document } from "mongoose";
import { IBeer } from "../interfaces/beer";

const BeerSchema: Schema = new Schema({
  name_korean: {
    type: String,
  },
  name_english: {
    type: String,
  },
  image: {
    type: String,
  },
  degree: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  isDistant: {
    type: Boolean,
    required: true,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "BeerCategories",
    required: true,
  },
  hashtag: {
    type: Array,
    default: [],
  },
  like_array: {
    type: Array,
    default: [],
  },
  features: {
    type: Object,
    default: {
      bitter: 1,
      crispy: 1,
      flavor: 1,
      sweet: 1,
      nutty: 1,
    },
  },
  count: {
    type: Number,
    default: 0,
  },
  calculatedCount: {
    type: Number,
    default: 0,
  },
  avgRate: {
    type: Number,
    default: 0,
  },
  location: {
    type: Array,
    default: [],
  },
  location_report: {
    type: Array,
    default: [],
  },
  createDate: {
    type: String,
  },
});

export default mongoose.model<IBeer & Document>("Beers", BeerSchema);

// import mongoose, { Schema, model, mongo } from "mongoose";

// const BeerSchema: Schema = new Schema({
//     name_korean: {
//         type: String
//     },
//     name_english: {
//         type: String
//     },
//     image: {
//         type: String
//     },
//     degree: {
//         type: Number,
//         required: true
//     },
//     categoryId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "BeerCategories",
//         required: true
//     },
//     hashtag: {
//         type: Array,
//         default: []
//     },
//     like_array: {
//         type: Array,
//         default: []
//     },
//     features: {
//         type: Object,
//         default: {
//             "bitter": 1,
//             "crispy": 1,
//             "flavor": 1,
//             "sweet": 1,
//             "nutty": 1
//         }
//     },
//     count: {
//         type: Number,
//         default: 0
//     },
//     avgRate: {
//         type: Number,
//         default: 0
//     },
//     location: {
//         type: Array,
//         default: []
//     },
//     location_report: {
//         type: Array,
//         default: []
//     },
//     createDate: {
//         type: String
//     }
// })

// export default mongoose.model("Beers", BeerSchema);
