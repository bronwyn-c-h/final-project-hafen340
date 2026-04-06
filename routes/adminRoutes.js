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
router.get('/users', requireAdmin, adminController.getUsers);
router.get('/users/:id/edit', requireAdmin, adminController.getEditUser);
router.post('/users/:id/edit', requireAdmin, adminController.postEditUser);
router.post('/users/:id/delete', requireAdmin, adminController.deleteUser);

export default router;