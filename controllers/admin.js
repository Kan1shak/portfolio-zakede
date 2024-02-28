import {posts} from "../models/posts.js";

const makePostList = async ()=> {
    const postList = await posts.find();
    return postList;
}

export const getAdmin = async(req, res)=>{
    const postList = await makePostList();
    res.render("admin",{postList});
}

export const logout = (req,res)=>{
    res.clearCookie("token");
    res.redirect("/");
}

export const newPost = async(req,res)=>{
    const {title, content,image} = req.body;
    const post = new posts({title,content,image});
    await post.save();
    res.redirect("/admin");
}

export const deletePost = async(req,res)=>{
    const id = req.params.id;
    await posts.findByIdAndDelete(id);
    res.redirect("/admin");
}

export const editPost = async(req,res)=>{
    const id = req.params.id;
    const post = await posts.findById(id);
    res.render("edit",{post});
}

export const updatePost = async(req,res)=>{
    const id = req.params.id;
    const {title,content,image} = req.body;
    await posts
    .findByIdAndUpdate(id,{title,content,image});
    res.redirect("/admin");
}
