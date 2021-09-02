import mongoose, { Schema, Document } from "mongoose";
import { IBeerCategory } from "../interfaces/beerCategory";

const BeerCategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  features: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // 0: avgRate, 1: count
  avgRate: {
    type: Object,
    default: {
      Lager: [0, 0],
      Pilsner: [0, 0],
      Ale: [0, 0],
      IPA: [0, 0],
      Weizen: [0, 0],
      Dunkel: [0, 0],
      Stout: [0, 0],
      Bock: [0, 0],
      Unknown: [0, 0],
      Etc: [0, 0],
    },
  },
  preferenceCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<IBeerCategory & Document>(
  "BeerCategories",
  BeerCategorySchema
);
