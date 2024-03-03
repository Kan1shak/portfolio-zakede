import { Router } from 'express';
import { getToc } from "../controllers/toc.js";
import { getPrivacy } from "../controllers/toc.js";
const router = Router();
router.get("/toc", getToc);
router.get("/privacy", getPrivacy);
export default router;