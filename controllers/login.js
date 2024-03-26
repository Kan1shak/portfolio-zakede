import jwt from "jsonwebtoken"; 
import { users } from "../models/users.js";
import bcrypt from "bcrypt";

const adminAddress = process.env.ADMIN_LINK || "admin";
const loginAddress = process.env.LOGIN_LINK || "login";

const secret = process.env.SECRET || "yesnyipoyes";

export const check = async(req,res,next)=>{
    const username= req.body.username;
    const password= req.body.password;
    let check = await users.findOne({username});
        if(check)
        {
            const match= await bcrypt.compare(password,check.password);
            if(match){
                login_post(req,res,check);
            } else {
                res.render("login",{username:username,message:"Incorrect Password",loginAddress});
            }
        }
        else{
            res.redirect(`/${loginAddress}`);
        }
}

export const isPresent =async(req,res,next) =>{
    let {token} = req.cookies;
    if(token){
        let decoded;
        try {
            decoded=jwt.verify(token,secret);
        }
        catch (err){
            return res.redirect(`/${loginAddress}`);
        }
        req.user = await users.findById(decoded._id);
        if(req.user){
            return next();
        } else {
            return res.redirect(`/${loginAddress}`);
        }
    }
    else return res.redirect(`/${loginAddress}`);
}

export const login =async(req, res)=>{
    let {token} = req.cookies;
    if(token){
        let decoded;
        try {
            decoded=jwt.verify(token,secret);
            req.user = await users.findById(decoded._id);
            if(req.user){
                return res.redirect(`/${adminAddress}`);
            }
        }
        catch (err){
            return res.render("login",{loginAddress});
        }
    }
    else {
        res.render("login",{loginAddress});
    }
}

export const login_post = (req,res,user)=>{
    const token = jwt.sign({_id:user._id},secret,{expiresIn:"2h"});
    res.cookie("token", token,{
    httpOnly:true,
    })
    res.redirect(`/${adminAddress}`);
}
