// importing packages, modules
import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";

// importing APIs
import { userRouter } from './routers/user';

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

app.listen(5208, () => {
    console.log("listening at http://localhost:5208");
})