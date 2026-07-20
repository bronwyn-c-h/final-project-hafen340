import { Router } from 'express';
import { showBooks, showBookDetail } from './bookController.js';
import { showSignup, showLogin, signup, login, logout } from './authController.js';
import { submitContentRating } from './ratingController.js';
import { requireLogin, requireRole } from '../middleware/auth.js';
import { submitReview, editReview, removeReview } from './reviewController.js';
import { showRequestForm, submitRequest, showMyRequests } from './requestController.js';
import { showModeratorDashboard, updateRatingStatus, moderatorDeleteReview } from './moderatorController.js';
import { showAdminDashboard, addBook, deleteBook, updateUserRole, updateRequestStatus } from './adminController.js';


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
router.post('/books/:id/reviews', requireLogin, submitReview);
router.post('/books/:id/reviews/:reviewId/delete', requireLogin, removeReview);
router.get('/requests', requireLogin, showMyRequests);
router.get('/requests/new', requireLogin, showRequestForm);
router.post('/requests', requireLogin, submitRequest);
router.get('/moderator', requireLogin, requireRole('moderator', 'admin'), showModeratorDashboard);
router.post('/moderator/ratings/:ratingId', requireLogin, requireRole('moderator', 'admin'), updateRatingStatus);
router.post('/moderator/reviews/:reviewId/delete', requireLogin, requireRole('moderator', 'admin'), moderatorDeleteReview);
router.get('/admin', requireLogin, requireRole('admin'), showAdminDashboard);
router.post('/admin/books', requireLogin, requireRole('admin'), addBook);
router.post('/admin/books/:bookId/delete', requireLogin, requireRole('admin'), deleteBook);
router.post('/admin/users/:userId/role', requireLogin, requireRole('admin'), updateUserRole);
router.post('/admin/requests/:requestId/status', requireLogin, requireRole('admin'), updateRequestStatus);


export default router;

