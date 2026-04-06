import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/semesters', requireAdmin, adminController.getSemesters);
router.get('/semesters/add', requireAdmin, adminController.getAddSemester);
router.post('/semesters/add', requireAdmin, adminController.postAddSemester);
router.get('/semesters/:id/slots', requireAdmin, adminController.getSlots);
router.get('/semesters/:id/slots/add', requireAdmin, adminController.getAddSlot);
router.post('/semesters/:id/slots/add', requireAdmin, adminController.postAddSlot);

export default router;