// importing packages, modules
import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";

// importing APIs
import { userRouter } from './routers/user';
import { commentRouter } from './routers/comment';
import { beerRouter } from './routers/beer';
import { beerCategoryRouter } from './routers/beerCategory';
import { myBeerRouter } from './routers/myBeer';
import { complaintRouter } from './routers/complaint';
import { recommendationRouter } from './routers/recommendation';

// importing crawling APIs
import { beerCategoryCrawlingRouter } from './postData/beerCategory';
import { beerCrawlingRouter } from './postData/beer';

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
app.use("/api/drink", [beerRouter]);
app.use("/api/drinkCategory", [beerCategoryRouter]);
app.use("/api/mybeer", [myBeerRouter]);
app.use("/api/complaint", [complaintRouter]);
app.use("/api/recommendation", [recommendationRouter]);


// crawling APIs
app.use("/api/crawling/beercategory", [beerCategoryCrawlingRouter]);
app.use("/api/crawling/beer", [beerCrawlingRouter]);

app.listen(5209, () => {
    console.log("listening at http://localhost:5209");
})

export { app };