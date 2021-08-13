import mongoose from "mongoose";
import { env } from "../env";

let url = "mongodb://localhost:27017/ohsool";

console.log("DB mode:", env.modeNow);

if (env.modeNow == "development" || env.modeNow == "production" || env.modeNow == "test") { // on server
  url = env.atlas_url;
}  // else it's local or jest

let database : mongoose.Connection;

export const connect = () => {
  if (database) {
    return;
  }
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    ignoreUndefined: true,
    useFindAndModify: false,
  });
  
  database = mongoose.connection;
  database.once("open", async () => {
    console.log('Connected to database');
  })
  database.on("error", async () => {
    console.log('Error connecting to database')
  });
}

export const disconnect = async () => {
  if (!database) {
    return;
  }
  // await database.close()
  await mongoose.disconnect();
  console.log('Database disconnected')
};
