import mongoose from "mongoose";
import { env } from "../env";

let url = "mongodb://localhost:27017/ohsool";

console.log("DB mode:", env.modeNow);

if (env.modeNow == "development" || env.modeNow == "production") { // on server
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

export const diconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};


// const url = "mongodb://localhost:27017/ohsool";

// const connect = (): void => {
//     mongoose
//       .connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         ignoreUndefined: true,
//         useFindAndModify: false,
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

// mongoose.connection.on("error", (err): void => {
//     console.log("mongoDB connection error:", err);
// });

// export { connect };
