import mongoose from "mongoose";
import { env } from "../env";

const url = env.url;

const connect = (): void => {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        ignoreUndefined: true
      })
      .catch((err) => {
        console.log(err);
      });
  };

mongoose.connection.on("error", (err): void => {
    console.log("mongoDB connection error:", err);
});

export { connect };
