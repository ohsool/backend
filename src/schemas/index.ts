import mongoose from "mongoose";
import { env } from "../env";
import { logger } from "../logger";


let url = "mongodb://localhost:27017/ohsool";
logger.info(`DB mode: ${env.modeNow}`);

// let url = env.atlas_url;

if (env.modeNow == "development" || env.modeNow == "production") {
  // on server
  url = env.atlas_url;
} else if (env.modeNow == "test") {
  // for jest test code
  url = env.test_url;
}

// else it's local

let database: mongoose.Connection;

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
    logger.info('Connected to database');
  })
  database.on("error", async () => {
    logger.error('Error connecting to database')
  });
};

export const disconnect = async () => {
  if (!database) {
    return;
  }
  // await database.close()
  await mongoose.disconnect();
  logger.info('Database disconnected')
};
