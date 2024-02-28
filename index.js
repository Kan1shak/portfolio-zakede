import  express  from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import json from "jsonwebtoken";
import { connect } from "http2";
import {connectDB} from "./data/database.js";
import loginrouter from "./routes/login.js";
import adminRouter from "./routes/admin.js";
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

app.get('/', (req,res)=>{
    res.render('index');
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});
