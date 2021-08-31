import mongoose from "mongoose";

export interface IAvgRate {
  [key: string]: Array<number>;
}

interface IFeatures {
  [key: string]: number;
}

export interface IBeerCategory {
  _id?: mongoose.Types.ObjectId;
  name: string;
  image: string;
  features: IFeatures;
  title: string;
  description: string;
  avgRate?: IAvgRate;
  preferenceCount?: number;
}
