import { Router } from 'express';
import { getPortfolio } from '../controllers/portfolio.js';
const router = Router();
router.get('/portfolio', getPortfolio);

export default router;