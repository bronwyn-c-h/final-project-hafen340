import express from 'express';
import * as parentController from '../controllers/parentController.js';
import { requireLogin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/students', requireLogin, parentController.getStudents);
router.get('/students/add', requireLogin, parentController.getAddStudent);
router.post('/students/add', requireLogin, parentController.postAddStudent);

export default router;