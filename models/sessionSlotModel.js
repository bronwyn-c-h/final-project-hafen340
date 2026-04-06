import pool from '../database/db.js';

export const getSlotsBySemester = async (semester_id) => {
    const result = await pool.query(
        `SELECT * FROM session_slots WHERE semester_id = $1 ORDER BY day_of_week, slot_time`,
        [semester_id]
    );
    return result.rows;
};

export const createSlot = async (semester_id, slot_time, day_of_week, max_students) => {
    const result = await pool.query(
        `INSERT INTO session_slots (semester_id, slot_time, day_of_week, max_students)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [semester_id, slot_time, day_of_week, max_students]
    );
    return result.rows[0];
};