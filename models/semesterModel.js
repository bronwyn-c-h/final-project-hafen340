import pool from '../database/db.js';

export const getAllSemesters = async () => {
    const result = await pool.query(
        'SELECT * FROM semesters ORDER BY start_date DESC'
    );
    return result.rows;
};

export const createSemester = async (name, start_date, end_date) => {
    const result = await pool.query(
        `INSERT INTO semesters (name, start_date, end_date)
         VALUES ($1, $2, $3) RETURNING *`,
        [name, start_date, end_date]
    );
    return result.rows[0];
};

export const getSemesterById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM semesters WHERE id = $1',
        [id]
    );
    return result.rows[0];
};