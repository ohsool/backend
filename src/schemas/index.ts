import mongoose from "mongoose";

const url = "mongodb://13.125.162.255:27017/admin";

const connect = (): void => {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        ignoreUndefined: true,
        user: "test",
        pass: "test"
      })
      .catch((err) => {
        console.log(err);
      });
  };

mongoose.connection.on("error", (err): void => {
    console.log("mongoDB connection error:", err);
});

export { connect };
