import pool from './db.js';

const createRequest = async (userId, title, authorName, notes) => {
  const result = await pool.query(
    `INSERT INTO book_requests (user_id, title, author_name, notes)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, title, authorName, notes]
  );
  return result.rows[0];
};

const getRequestsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM book_requests 
     WHERE user_id = $1 
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const getAllRequests = async () => {
  const result = await pool.query(
    `SELECT book_requests.*, users.username 
     FROM book_requests
     JOIN users ON book_requests.user_id = users.id
     ORDER BY created_at DESC`
  );
  return result.rows;
};

const updateRequestStatus = async (requestId, status) => {
  const result = await pool.query(
    `UPDATE book_requests 
     SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [status, requestId]
  );
  return result.rows[0];
};

export { createRequest, getRequestsByUser, getAllRequests, updateRequestStatus };