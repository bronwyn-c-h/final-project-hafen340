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

export const getSessionsByTutor = async (tutor_id) => {
    const result = await pool.query(
        `SELECT sessions.*, session_slots.slot_time, session_slots.day_of_week,
        semesters.name as semester_name,
        COUNT(session_enrollments.id) as enrolled_count
        FROM sessions
        JOIN session_slots ON sessions.slot_id = session_slots.id
        JOIN semesters ON session_slots.semester_id = semesters.id
        LEFT JOIN session_enrollments ON sessions.id = session_enrollments.session_id
        WHERE sessions.support_tutor_id = $1
        AND sessions.session_date >= CURRENT_DATE
        GROUP BY sessions.id, session_slots.slot_time, session_slots.day_of_week,
        semesters.name
        ORDER BY sessions.session_date, session_slots.slot_time`,
        [tutor_id]
    );
    return result.rows;
};

export const getSessionWithStudents = async (session_id) => {
    const result = await pool.query(
        `SELECT session_enrollments.id as enrollment_id,
        session_enrollments.status as enrollment_status,
        students.first_name, students.last_name,
        sessions.session_date, sessions.status as session_status,
        session_slots.slot_time, session_slots.day_of_week,
        progress_notes.note, progress_notes.created_at as note_date
        FROM session_enrollments
        JOIN sessions ON session_enrollments.session_id = sessions.id
        JOIN session_slots ON sessions.slot_id = session_slots.id
        JOIN students ON session_enrollments.student_id = students.id
        LEFT JOIN progress_notes ON session_enrollments.id = progress_notes.enrollment_id
        WHERE sessions.id = $1
        ORDER BY students.first_name`,
        [session_id]
    );
    return result.rows;
};