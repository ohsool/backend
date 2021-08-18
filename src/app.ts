/*
sudo lsof -i :5209
kill -9 [PID]
*/

// importing packages, modules
import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import passport from "passport";
import fs from "fs";
import https from "https";
import path from "path";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// importing APIs
import { userRouter } from './routers/user';
import { commentRouter } from './routers/comment';
import { beerRouter } from './routers/beer';
import { beerCategoryRouter } from './routers/beerCategory';
import { myBeerRouter } from './routers/myBeer';
import { complaintRouter } from './routers/complaint';
import { recommendationRouter } from './routers/recommendation';
import { searchRouter } from './routers/search';

import { googlePassportConfig } from './routers/passport_google';
import { kakaoPassportConfig } from './routers/passport_kakao';

// importing crawling APIs
import { beerCategoryCrawlingRouter } from './postData/beerCategory';
import { beerCrawlingRouter } from './postData/beer';

// importing swagger 
import swaggerUi from 'swagger-ui-express';
const swaggerFile =  require('../swagger/swagger-output.json')

// importing DB
import { connect } from './schemas';

// importing env
import { env } from "./env";

// get secretKeyMiddleware
import { secretKeyMiddleware } from './middlewares/secretkey-middleware';

const port = env.port;
const app = express();
connect();
console.log("mongodb connecting success");

const parseForm = bodyParser.urlencoded({ extended: false });

app.use(parseForm);
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// initialize google authenticate
console.log("passport initializing...")
app.use(passport.initialize());
app.use(passport.session());

googlePassportConfig();
kakaoPassportConfig();
console.log("passport initializing done");

// setting CORS
const allowOrigins = [
    env.page_domain_address,
    env.jy_ip,
    env.dh_ip
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (allowOrigins.indexOf(String(origin)) !== -1) {
            callback(null, true);
        } else {
            callback(new Error());
        }
    }
};
app.use(cors(corsOptions));

// setup csrf protection
const csrfProtection = csrf({ cookie: true });
app.use(cookieParser());

// setup helmet
app.use(helmet());
app.use(helmet.contentSecurityPolicy());  // prevent from XSS
// app.use(helmet.hpkp());  // add Public Key Pinning header
// app.use(helmet.noCache());  // set Cache-Control, Pragma header. let client not use caching
// app.use(helmet.referrerPolicy());  // 

app.get("/", (req, res) => {
    res.send(`🎉Welcome to BACK!💐 <br>-NODEMEN👨‍👩‍👦`);
});

import { secretAPIkey } from './ssl/secretAPI';
const secretKey = secretAPIkey();
console.log("secret key now: ", secretKey);

app.use(`/api/user`, [userRouter]);

app.use(secretKeyMiddleware);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.get("/search", (req, res) => {
    res.render("index")
})

// APIs
// app.use(`/api/user`, [userRouter]);
app.use(`/api/comment`, [commentRouter]);
app.use(`/api/beer`, [beerRouter]);
app.use(`/api/beerCategory`, [beerCategoryRouter]);
app.use(`/api/mybeer`, [myBeerRouter]);
app.use(`/api/complaint`, [complaintRouter]);
app.use(`/api/recommendation`, [recommendationRouter]);
app.use(`/api/search`, [searchRouter]);

// crawling APIs
app.use(`/api/crawling/beercategory`, [beerCategoryCrawlingRouter]);
app.use(`/api/crawling/beer`, [beerCrawlingRouter]);

console.log("mode:", env.modeNow);

if (env.modeNow == "development" || env.modeNow == "production") {  // on server
    const options = {
        key: fs.readFileSync(path.join(__dirname, "ssl", "ohsoolkey.key")),
        cert: fs.readFileSync(path.join(__dirname, "ssl", "ohsoolcert.crt"))
    };

    const secure = https.createServer(options, app);
    secure.listen(port, () => {
        console.log(`server running.. ${port}`);
    })
} else if (!env.modeNow) {  // local
    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`);
    });
} 

export { app };
