// importing packages, modules
import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";

// importing APIs
import { userRouter } from './routers/user';
import { commentRouter } from './routers/comment';
import { drinkRouter } from './routers/drink';
import { drinkCategoryRouter } from './routers/drinkCategory';

// importing DB
import { connect } from './schemas';

const app = express();
connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

const allowOrigins = [];
app.use(cors());

app.get("/", (req, res) => {
    res.send("🎉Welcome to BACK!💐 <br>-NODEMEN👨‍👩‍👦");
});

// APIs
app.use("/api/user", [userRouter]);
app.use("/api/comment", [commentRouter]);
app.use("/api/drink", [drinkRouter]);
app.use("/api/drinkCategory", [drinkCategoryRouter]);

app.listen(5208, () => {
    console.log("listening at http://localhost:5208");
})

export { app };