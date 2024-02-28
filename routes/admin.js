import express from "express";
import { getAdmin } from "../controllers/admin.js";
import { logout } from "../controllers/admin.js";
import { newPost } from "../controllers/admin.js";
import { deletePost } from "../controllers/admin.js";
import { editPost } from "../controllers/admin.js";
import { updatePost } from "../controllers/admin.js";

const router = express.Router();

router.get("/admin", getAdmin);

router.get("/admin/logout", logout);

router.post("/admin/new", newPost);

router.get("/admin/delete/:id", deletePost);

router.get("/admin/edit/:id", editPost);

router.post("/admin/update/:id", updatePost);

export default router;