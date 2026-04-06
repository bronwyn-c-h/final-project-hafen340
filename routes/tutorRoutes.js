import express from 'express';
import * as tutorController from '../controllers/tutorController.js';
import { requireSupportTutor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/sessions', requireSupportTutor, tutorController.getSessions);
router.get('/sessions/:id', requireSupportTutor, tutorController.getSessionDetail);
router.post('/sessions/:id/notes', requireSupportTutor, tutorController.postProgressNote);

export default router;