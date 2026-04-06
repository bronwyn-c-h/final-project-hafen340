import express from 'express';
import * as tutorController from '../controllers/tutorController.js';
import { requireSupportTutor } from '../middleware/authMiddleware.js';
import { validateProgressNote } from '../middleware/validation.js';

const router = express.Router();

router.get('/sessions', requireSupportTutor, tutorController.getSessions);
router.get('/sessions/:id', requireSupportTutor, tutorController.getSessionDetail);
router.post('/sessions/:id/notes', requireSupportTutor, tutorController.postProgressNote);
router.post('/sessions/:id/notes', requireSupportTutor, validateProgressNote, tutorController.postProgressNote);

export default router;