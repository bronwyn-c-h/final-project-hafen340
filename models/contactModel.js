import pool from '../database/db.js';

export const createMessage = async (name, email, message) => {
    const result = await pool.query(
        `INSERT INTO contact_messages (name, email, message)
         VALUES ($1, $2, $3) RETURNING *`,
        [name, email, message]
    );
    return result.rows[0];
};

export const getAllMessages = async () => {
    const result = await pool.query(
        'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );
    return result.rows;
};