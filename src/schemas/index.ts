import mongoose from "mongoose";

import { env } from "../env";

const url = env.url;

const connect = (): void => {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        ignoreUndefined: true,
        user: "ohsool_admin",
        pass: "ohsool5209"
      })
      .catch((err) => {
        console.log(err);
      });
  };

mongoose.connection.on("error", (err): void => {
    console.log("mongoDB connection error:", err);
});

export { connect };