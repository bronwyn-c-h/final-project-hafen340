import pool from '../database/db.js';

export const createUser = async (first_name, last_name, email, password) => {
  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password, role) 
     VALUES ($1, $2, $3, $4, 'parent') 
     RETURNING id, first_name, last_name, email, role`,
    [first_name, last_name, email, password]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};