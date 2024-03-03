import { Router } from 'express';
import { getAbout } from '../controllers/about.js';

const router = Router();

router.get('/about', getAbout);

export default router;