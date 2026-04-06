import pool from '../database/db.js';

export const getAllSessions = async () => {
    const result = await pool.query(
        `SELECT sessions.*, session_slots.slot_time, session_slots.day_of_week, 
        semesters.name as semester_name,
        users.first_name as tutor_first_name, users.last_name as tutor_last_name
        FROM sessions
        JOIN session_slots ON sessions.slot_id = session_slots.id
        JOIN semesters ON session_slots.semester_id = semesters.id
        LEFT JOIN users ON sessions.support_tutor_id = users.id
        ORDER BY sessions.session_date, session_slots.slot_time`
    );
    return result.rows;
};

export const createSession = async (slot_id, session_date, support_tutor_id = null) => {
    const result = await pool.query(
        `INSERT INTO sessions (slot_id, session_date, support_tutor_id, status)
         VALUES ($1, $2, $3, 'scheduled') RETURNING *`,
        [slot_id, session_date, support_tutor_id]
    );
    return result.rows[0];
};

export const updateSession = async (id, status, support_tutor_id) => {
    const result = await pool.query(
        `UPDATE sessions SET status = $1, support_tutor_id = $2 WHERE id = $3 RETURNING *`,
        [status, support_tutor_id, id]
    );
    return result.rows[0];
};

export const getSessionById = async (id) => {
    const result = await pool.query(
        `SELECT sessions.*, session_slots.slot_time, session_slots.day_of_week
         FROM sessions
         JOIN session_slots ON sessions.slot_id = session_slots.id
         WHERE sessions.id = $1`,
        [id]
    );
    return result.rows[0];
};

export const getAvailableSessions = async () => {
    const result = await pool.query(
        `SELECT sessions.*, session_slots.slot_time, session_slots.day_of_week,
        semesters.name as semester_name,
        COUNT(session_enrollments.id) as enrolled_count,
        session_slots.max_students
        FROM sessions
        JOIN session_slots ON sessions.slot_id = session_slots.id
        JOIN semesters ON session_slots.semester_id = semesters.id
        LEFT JOIN session_enrollments ON sessions.id = session_enrollments.session_id
        WHERE sessions.status = 'scheduled'
        AND sessions.session_date >= CURRENT_DATE
        GROUP BY sessions.id, session_slots.slot_time, session_slots.day_of_week,
        semesters.name, session_slots.max_students
        HAVING COUNT(session_enrollments.id) < session_slots.max_students
        ORDER BY sessions.session_date, session_slots.slot_time`
    );
    return result.rows;
};