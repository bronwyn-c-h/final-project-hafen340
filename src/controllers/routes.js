import { Router } from 'express';

const router = Router();

/**
 * Home route
 */
router.get('/', (req, res) => {
  res.render('index');
});

export default router;