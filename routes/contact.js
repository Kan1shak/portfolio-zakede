import { Router } from 'express';
import { getContact } from "../controllers/contact.js";
const router = Router();
router.get("/contact", getContact);
export default router;