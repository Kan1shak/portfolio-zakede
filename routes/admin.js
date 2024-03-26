import express from "express";
import { getAdmin } from "../controllers/admin.js";
import { logout } from "../controllers/admin.js";
import { newPost } from "../controllers/admin.js";
import { deletePost } from "../controllers/admin.js";
import { editPost } from "../controllers/admin.js";
import { updatePost } from "../controllers/admin.js";

const router = express.Router();

const adminAddress = process.env.ADMIN_LINK || "admin";

router.get(`/${adminAddress}`, getAdmin);

router.get(`/${adminAddress}/logout`, logout);

router.post(`/${adminAddress}/new`, newPost);

router.get(`/${adminAddress}/delete/:id`, deletePost);

router.get(`/${adminAddress}/edit/:id`, editPost);

router.post(`/${adminAddress}/update/:id`, updatePost);

export default router;