// importing packages, modules
import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import passport from "passport";

// importing APIs
import { userRouter } from '../routers/user';
import { commentRouter } from '../routers/comment';
import { beerRouter } from '../routers/beer';
import { beerCategoryRouter } from '../routers/beerCategory';
import { myBeerRouter } from '../routers/myBeer';
import { complaintRouter } from '../routers/complaint';
import { recommendationRouter } from '../routers/recommendation';
import { searchRouter } from '../routers/search';
import { googlePassportConfig } from '../routers/passport_google';
import { kakaoPassportConfig } from '../routers/passport_kakao';

// importing DB
import { connect } from '../schemas';

// importing env
import { env } from "../env";


const app = express();
connect();
console.log("mongodb connecting success");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

// initialize google authenticate
console.log("passport initializing...")
app.use(passport.initialize());
app.use(passport.session());

googlePassportConfig();
kakaoPassportConfig();
console.log("passport initializing done");

app.use(`/api/user`, [userRouter]);
app.use(`/api/comment`, [commentRouter]);
app.use(`/api/beer`, [beerRouter]);
app.use(`/api/beerCategory`, [beerCategoryRouter]);
app.use(`/api/mybeer`, [myBeerRouter]);
app.use(`/api/complaint`, [complaintRouter]);
app.use(`/api/recommendation`, [recommendationRouter]);
app.use(`/api/search`, [searchRouter]);

console.log("mode:", env.modeNow);

export { app };
