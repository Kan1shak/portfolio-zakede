import  express  from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

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

app.use(function(req, res, next){
    res.status(404).render('404');
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});
