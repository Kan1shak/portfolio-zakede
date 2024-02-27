import express from "express";
import { login } from "../controllers/login.js";
import { check } from "../controllers/login.js";
import { login_post } from "../controllers/login.js";
import { isPresent } from "../controllers/login.js";

const router = express.Router();


router.get("/login",isPresent,login);
router.post("/login",check,login_post);

export default router;