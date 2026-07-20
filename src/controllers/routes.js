import { Router } from 'express';
import { showBooks, showBookDetail } from './bookController.js';
import { showSignup, showLogin, signup, login, logout } from './authController.js';
import { submitContentRating } from './ratingController.js';
import { requireLogin, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/books', showBooks);
router.get('/books/:id', showBookDetail);

router.get('/signup', showSignup);
router.post('/signup', signup);
router.get('/login', showLogin);
router.post('/login', login);
router.get('/logout', logout);
router.post('/books/:id/rate', requireLogin, submitContentRating);

export default router;

