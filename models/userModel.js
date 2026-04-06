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

export const getAllUsers = async () => {
    const result = await pool.query(
        'SELECT id, first_name, last_name, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    return result.rows;
};

export const getUserById = async (id) => {
    const result = await pool.query(
        'SELECT id, first_name, last_name, email, role FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

export const updateUserRole = async (id, role) => {
    const result = await pool.query(
        'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
        [role, id]
    );
    return result.rows[0];
};

export const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
};