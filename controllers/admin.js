import {posts} from "../models/posts.js";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { isPresent } from "../controllers/login.js";

export const makePostList = async ()=> {
    const postList = await posts.find();
    postList.reverse();
    return postList;
}

export const getAdmin = async(req, res)=>{
    isPresent(req,res,()=>{res.redirect("/login")});
    const postList = await makePostList();
    res.render("admin",{postList});
}

export const logout = (req,res)=>{
    res.clearCookie("token");
    res.redirect("/");
}

export const newPost = async(req,res)=>{
    isPresent(req,res,()=>{res.redirect("/login")});
    const {title, content,image,rawHTML} = req.body;
    const deltaOps = JSON.parse(req.body.content);
    let cfg = {inlineStyles: true};
    let converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);
    let html = converter.convert(); 
    const post = new posts({title,content:html,image,qlDelta:rawHTML});
    await post.save();
    res.redirect("/admin");
}

export const deletePost = async(req,res)=>{
    isPresent(req,res,()=>{res.redirect("/login")});
    const id = req.params.id;
    await posts.findByIdAndDelete(id);
    res.redirect("/admin");
}

export const editPost = async(req,res)=>{
    isPresent(req,res,()=>{res.redirect("/login")});
    const postList = await makePostList();
    const id = req.params.id
    const post = await posts.findById(id);
    res.render("edit",{post,postList});
}

export const updatePost = async(req,res)=>{
    isPresent(req,res,()=>{res.redirect("/login")});
    const id = req.params.id;
    const {title, content,image,rawHTML} = req.body;
    const deltaOps = JSON.parse(req.body.content);
    let cfg = {inlineStyles: true};
    let converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);
    let html = converter.convert(); 
    await posts.findByIdAndUpdate(id,{title,content:html,image,qlDelta:rawHTML});
    res.redirect("/admin");
}
