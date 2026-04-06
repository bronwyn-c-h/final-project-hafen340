import pool from '../database/db.js';

export const enrollStudent = async (session_id, student_id) => {
    const result = await pool.query(
        `INSERT INTO session_enrollments (session_id, student_id, status)
         VALUES ($1, $2, 'enrolled') RETURNING *`,
        [session_id, student_id]
    );
    return result.rows[0];
};

export const getEnrollmentsByParent = async (parent_id) => {
    const result = await pool.query(
        `SELECT session_enrollments.*, 
        sessions.session_date, sessions.status as session_status,
        session_slots.slot_time, session_slots.day_of_week,
        students.first_name as student_first_name, 
        students.last_name as student_last_name,
        semesters.name as semester_name
        FROM session_enrollments
        JOIN sessions ON session_enrollments.session_id = sessions.id
        JOIN session_slots ON sessions.slot_id = session_slots.id
        JOIN semesters ON session_slots.semester_id = semesters.id
        JOIN students ON session_enrollments.student_id = students.id
        WHERE students.parent_id = $1
        ORDER BY sessions.session_date DESC`,
        [parent_id]
    );
    return result.rows;
};

export const checkAlreadyEnrolled = async (session_id, student_id) => {
    const result = await pool.query(
        `SELECT * FROM session_enrollments 
         WHERE session_id = $1 AND student_id = $2`,
        [session_id, student_id]
    );
    return result.rows[0];
};

export const addProgressNote = async (enrollment_id, note) => {
    const result = await pool.query(
        `INSERT INTO progress_notes (enrollment_id, note)
         VALUES ($1, $2) RETURNING *`,
        [enrollment_id, note]
    );
    return result.rows[0];
};