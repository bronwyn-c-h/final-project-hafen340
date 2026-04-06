import pool from '../database/db.js';

export const getStudentsByParent = async (parent_id) => {
    const result = await pool.query(
        'SELECT * FROM students WHERE parent_id = $1 ORDER BY first_name',
        [parent_id]
    );
    return result.rows;
};

export const createStudent = async (parent_id, first_name, last_name, date_of_birth, notes) => {
    const result = await pool.query(
        `INSERT INTO students (parent_id, first_name, last_name, date_of_birth, notes)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [parent_id, first_name, last_name, date_of_birth, notes]
    );
    return result.rows[0];
};