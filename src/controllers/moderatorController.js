import pool from '../models/db.js';

const showModeratorDashboard = async (req, res, next) => {
  try {
    const ratingsResult = await pool.query(
      `SELECT content_ratings.*, users.username, books.title AS book_title
       FROM content_ratings
       JOIN users ON content_ratings.user_id = users.id
       JOIN books ON content_ratings.book_id = books.id
       WHERE content_ratings.status = 'pending'
       ORDER BY content_ratings.created_at DESC`
    );

    const reviewsResult = await pool.query(
      `SELECT reviews.*, users.username, books.title AS book_title
       FROM reviews
       JOIN users ON reviews.user_id = users.id
       JOIN books ON reviews.book_id = books.id
       ORDER BY reviews.created_at DESC`
    );

    res.render('moderator/dashboard', {
      pendingRatings: ratingsResult.rows,
      reviews: reviewsResult.rows
    });
  } catch (err) {
    next(err);
  }
};

const updateRatingStatus = async (req, res, next) => {
  try {
    const { ratingId } = req.params;
    const { status } = req.body;

    await pool.query(
      `UPDATE content_ratings SET status = $1 WHERE id = $2`,
      [status, ratingId]
    );

    res.redirect('/moderator');
  } catch (err) {
    next(err);
  }
};

const moderatorDeleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    await pool.query(
      `DELETE FROM reviews WHERE id = $1`,
      [reviewId]
    );

    res.redirect('/moderator');
  } catch (err) {
    next(err);
  }
};

export { showModeratorDashboard, updateRatingStatus, moderatorDeleteReview };