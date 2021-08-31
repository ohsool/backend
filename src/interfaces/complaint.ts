import mongoose from "mongoose";

export interface IComplaint {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  userId?: mongoose.Types.ObjectId;
  date: string;
  isSolved?: boolean;
}
