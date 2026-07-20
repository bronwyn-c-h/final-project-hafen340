import pool from './db.js';

const submitRating = async (userId, bookId, spiceLevel, violenceLevel, languageLevel) => {
  const result = await pool.query(
    `INSERT INTO content_ratings (user_id, book_id, spice_level, violence_level, language_level)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (user_id, book_id) 
     DO UPDATE SET spice_level = $3, violence_level = $4, language_level = $5
     RETURNING *`,
    [userId, bookId, spiceLevel, violenceLevel, languageLevel]
  );
  return result.rows[0];
};

const getUserRatingForBook = async (userId, bookId) => {
  const result = await pool.query(
    `SELECT * FROM content_ratings WHERE user_id = $1 AND book_id = $2`,
    [userId, bookId]
  );
  return result.rows[0];
};

export { submitRating, getUserRatingForBook };