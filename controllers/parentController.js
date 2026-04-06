import * as studentModel from '../models/studentModel.js';
import * as sessionModel from '../models/sessionModel.js';
import * as enrollmentModel from '../models/enrollmentModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getStudents = asyncHandler(async (req, res) => {
    const students = await studentModel.getStudentsByParent(req.session.user.id);
    res.render('parent/students', { students });
});

export const getAddStudent = (req, res) => {
    res.render('parent/addStudent', { error: null });
};

export const postAddStudent = asyncHandler(async (req, res) => {
    const { first_name, last_name, date_of_birth, notes } = req.body;
    await studentModel.createStudent(req.session.user.id, first_name, last_name, date_of_birth, notes);
    res.redirect('/parent/students');
});

export const getBookSession = asyncHandler(async (req, res) => {
    const sessions = await sessionModel.getAvailableSessions();
    const students = await studentModel.getStudentsByParent(req.session.user.id);
    res.render('parent/bookSession', { sessions, students, error: null });
});

export const postBookSession = asyncHandler(async (req, res) => {
    const { session_id, student_id } = req.body;

    const existing = await enrollmentModel.checkAlreadyEnrolled(session_id, student_id);
    if (existing) {
        const sessions = await sessionModel.getAvailableSessions();
        const students = await studentModel.getStudentsByParent(req.session.user.id);
        return res.render('parent/bookSession', {
            sessions, students,
            error: 'This student is already enrolled in that session'
        });
    }

    await enrollmentModel.enrollStudent(session_id, student_id);
    res.redirect('/parent/bookings/history');
});

export const getBookingHistory = asyncHandler(async (req, res) => {
    const enrollments = await enrollmentModel.getEnrollmentsByParent(req.session.user.id);
    res.render('parent/bookingHistory', { enrollments });
});

export const cancelBooking = asyncHandler(async (req, res) => {
    await enrollmentModel.cancelEnrollment(req.params.id, req.session.user.id);
    res.redirect('/parent/bookings/history');
});