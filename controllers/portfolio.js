import {posts} from "../models/posts.js";
import { makePostList } from "./admin.js";

export const getPortfolio = async(req, res)=>{
    const postList = await makePostList();
    res.render("portfolio",{postList});
}

