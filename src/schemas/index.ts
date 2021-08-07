import Mongoose from "mongoose";
import { env } from "../env";

let database : Mongoose.Connection;
const url = env.atlas_url;
// const url = env.url;
// const user = env.user;
// const pass = env.pass;

export const connect = () => {
  if (database) {
    return;
  }
  Mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    ignoreUndefined: true,
    useFindAndModify: false,
  });
  
  database = Mongoose.connection;
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
  Mongoose.disconnect();
};


// const connect = (): void => {
//     mongoose
//       .connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         ignoreUndefined: true,
//         useFindAndModify: false,
//         user: "ohsool_admin",
//         pass: pass
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

// mongoose.connection.on("error", (err): void => {
//     console.log("mongoDB connection error:", err);
// });

// export { connect };
