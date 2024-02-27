import jwt from "jsonwebtoken"; 
import { users } from "../models/users.js";
import bcrypt from "bcrypt";
import { render } from "ejs";

let user;
export const check =async(req,res,next)=>{
    const username= req.body.username;
    const password= req.body.password;
    let check = await users.findOne({username});
        if(check)
        {
            user=check;
            const match= await bcrypt.compare(password,user.password);
            if(match)
            next();
            else
            res.render("login",{username:username,message:"Incorrect Password"});
        }
        else{
            res.redirect("/login");
        }
}

export const isPresent =async(req,res,next) =>{
    let {token} = req.cookies;
    if(token){
        const decoded=jwt.verify(token,"yippie");
        req.user = await users.findById(decoded._id);
        if(!req.user){
            return next();
        }
        res.redirect("/admin");
    }
    else next();
}

export const login =async(req,  res)=>{
    res.render("login");
}

export const login_post = (req,res)=>{
    const token = jwt.sign({_id:user._id},"yippie",{expiresIn:"2h"});
    res.cookie("token", token,{
    httpOnly:true,
    })
    res.redirect("/");
}
