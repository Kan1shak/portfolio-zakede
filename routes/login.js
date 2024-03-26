import express from "express";
import { login } from "../controllers/login.js";
import { check } from "../controllers/login.js";

const router = express.Router();

const loginAddress = process.env.LOGIN_LINK || "login";

router.get(`/${loginAddress}`,login);
router.post(`/${loginAddress}`,check);

export default router;