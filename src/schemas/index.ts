import mongoose from "mongoose";
import { env } from "../env";

// const url = env.url;
const url = 'mongodb://localhost:27017/ohsool_dev'
console.log("mongo:::", url)

const connect = (): void => {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        ignoreUndefined: true,
//         ssl: true,
//         sslValidate: true,
        user:"test",
        pass:"test"
      }) 
      .catch((err) => {
        console.log(err);
      });
  };

mongoose.connection.on("error", (err): void => {
    console.log("mongoDB connection error:", err);
});

export { connect };
