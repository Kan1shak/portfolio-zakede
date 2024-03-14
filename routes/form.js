import { Router } from "express";
import {contactPost} from "../controllers/form.js";

const router = Router();

router.post("/submitform", contactPost);

export default router;