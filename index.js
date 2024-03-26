import https from "https";
import fs from "fs";

import  express  from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import {connectDB} from "./data/database.js";
import { makePostList } from "./controllers/admin.js";

import loginrouter from "./routes/login.js";
import adminRouter from "./routes/admin.js";
import portfolioRouter from "./routes/portfolio.js";
import aboutRouter from "./routes/about.js";
import contactRouter from "./routes/contact.js";
import tocRouter from "./routes/toc.js";
import formRouter from "./routes/form.js";


const app = express();

// for cloudflare proxy
const numberOfProxies = 1;
app.set('trust proxy', numberOfProxies);

const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/mannatgd.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/mannatgd.com/privkey.pem')
};

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 150,
});

app.use(limiter);

app.use(
    helmet.contentSecurityPolicy({
        directives: {
        "default-src" : ["'self'"],
        "script-src": ["'self'", "cdn.jsdelivr.net"],
        "connect-src": ["'self'",'api.imgbb.com'],
        "img-src": ["'self'", "i.ibb.co", "imgbb.com", "data:"],
        },
    }),
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

app.use(compression());

app.set("view engine","ejs");
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join("public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(loginrouter);
app.use(adminRouter);
app.use(portfolioRouter);
app.use(aboutRouter);
app.use(contactRouter);
app.use(tocRouter);
app.use(formRouter);

app.get('/', async (req,res)=>{
    const postList = await makePostList();
    res.render('index',{postList});
});

app.use((req, res, next) => {
    res.status(404).render('404');
});

https.createServer(options, app).listen(443, () => {
    console.log("Server is running on port 443");
});