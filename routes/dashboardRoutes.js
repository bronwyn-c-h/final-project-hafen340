import express from 'express';
import { requireLogin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', requireLogin, (req, res) => {
    res.render('dashboard/index');
});

export default router;