import mongoose, { Schema, model, mongo } from "mongoose";

const DrinkCategorySchema: Schema = new Schema({
    title: String,
    image: String
});

export default mongoose.model("DrinkCategories", DrinkCategorySchema);