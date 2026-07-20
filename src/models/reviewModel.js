import pool from './db.js';

const createReview = async (userId, bookId, body) => {
  const result = await pool.query(
    `INSERT INTO reviews (user_id, book_id, body)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, bookId, body]
  );
  return result.rows[0];
};

const updateReview = async (reviewId, userId, body) => {
  const result = await pool.query(
    `UPDATE reviews SET body = $1
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
    [body, reviewId, userId]
  );
  return result.rows[0];
};

const deleteReview = async (reviewId, userId) => {
  const result = await pool.query(
    `DELETE FROM reviews WHERE id = $1 AND user_id = $2`,
    [reviewId, userId]
  );
  return result.rowCount > 0;
};

export { createReview, updateReview, deleteReview };