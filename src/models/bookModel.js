import pool from './db.js';

const getAllBooks = async () => {
  const result = await pool.query(
    `SELECT books.*, authors.name AS author_name 
     FROM books 
     LEFT JOIN authors ON books.author_id = authors.id
     ORDER BY books.title ASC`
  );
  return result.rows;
};

const getBookById = async (id) => {
  const result = await pool.query(
    `SELECT books.*, authors.name AS author_name 
     FROM books 
     LEFT JOIN authors ON books.author_id = authors.id
     WHERE books.id = $1`,
    [id]
  );
  return result.rows[0];
};

const getBookRatings = async (bookId) => {
  const result = await pool.query(
    `SELECT 
      ROUND(AVG(spice_level), 1) AS avg_spice,
      ROUND(AVG(violence_level), 1) AS avg_violence,
      ROUND(AVG(language_level), 1) AS avg_language
     FROM content_ratings
     WHERE book_id = $1 AND status = 'approved'`,
    [bookId]
  );
  return result.rows[0];
};

const getBookReviews = async (bookId) => {
  const result = await pool.query(
    `SELECT reviews.*, users.username
     FROM reviews
     JOIN users ON reviews.user_id = users.id
     WHERE reviews.book_id = $1
     ORDER BY reviews.created_at DESC`,
    [bookId]
  );
  return result.rows;
};

export { getAllBooks, getBookById, getBookRatings, getBookReviews };