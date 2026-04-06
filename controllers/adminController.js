console.log('adminController loaded');

import * as semesterModel from '../models/semesterModel.js';
import * as sessionSlotModel from '../models/sessionSlotModel.js';
import * as userModel from '../models/userModel.js';
import * as sessionModel from '../models/sessionModel.js';
import * as contactModel from '../models/contactModel.js';

export const getSemesters = async (req, res) => {
    const semesters = await semesterModel.getAllSemesters();
    res.render('admin/semesters', { semesters });
};

export const getAddSemester = (req, res) => {
    res.render('admin/addSemester', { error: null });
};

export const postAddSemester = async (req, res) => {
    const { name, start_date, end_date } = req.body;
    await semesterModel.createSemester(name, start_date, end_date);
    res.redirect('/admin/semesters');
};

export const getSlots = async (req, res) => {
    const semester = await semesterModel.getSemesterById(req.params.id);
    const slots = await sessionSlotModel.getSlotsBySemester(req.params.id);
    res.render('admin/slots', { semester, slots });
};

export const getAddSlot = async (req, res) => {
    const semester = await semesterModel.getSemesterById(req.params.id);
    res.render('admin/addSlot', { semester, error: null });
};

export const postAddSlot = async (req, res) => {
    const { slot_time, day_of_week, max_students } = req.body;
    await sessionSlotModel.createSlot(req.params.id, slot_time, day_of_week, max_students);
    res.redirect(`/admin/semesters/${req.params.id}/slots`);
};

export const getUsers = async (req, res) => {
    const users = await userModel.getAllUsers();
    res.render('admin/users', { users });
};

export const getEditUser = async (req, res) => {
    const user = await userModel.getUserById(req.params.id);
    res.render('admin/editUser', { editUser: user, error: null });
};

export const postEditUser = async (req, res) => {
    const { role } = req.body;
    await userModel.updateUserRole(req.params.id, role);
    res.redirect('/admin/users');
};

export const deleteUser = async (req, res) => {
    await userModel.deleteUser(req.params.id);
    res.redirect('/admin/users');
};

export const getSessions = async (req, res) => {
    const sessions = await sessionModel.getAllSessions();
    const semesters = await semesterModel.getAllSemesters();
    res.render('admin/sessions', { sessions, semesters });
};

export const generateSessions = async (req, res) => {
    const semester = await semesterModel.getSemesterById(req.params.id);
    const slots = await sessionSlotModel.getSlotsBySemester(req.params.id);
    const tutors = await userModel.getTutors();
    
    // Auto-assign the first support tutor found
    const supportTutor = tutors.find(t => t.role === 'support_tutor') || tutors[0];
    const tutorId = supportTutor ? supportTutor.id : null;

    const startDate = new Date(semester.start_date);
    const endDate = new Date(semester.end_date);

    const dayMap = {
        'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
        'Thursday': 4, 'Friday': 5, 'Saturday': 6
    };

    for (const slot of slots) {
        const targetDay = dayMap[slot.day_of_week];
        const current = new Date(startDate);

        while (current.getDay() !== targetDay) {
            current.setDate(current.getDate() + 1);
        }

        while (current <= endDate) {
            await sessionModel.createSession(slot.id, current.toISOString().split('T')[0], tutorId);
            current.setDate(current.getDate() + 7);
        }
    }

    res.redirect('/admin/sessions');
};

export const getEditSession = async (req, res) => {
    const session = await sessionModel.getSessionById(req.params.id);
    const tutors = await userModel.getTutors();
    res.render('admin/editSession', { session, tutors, error: null });
};

export const postEditSession = async (req, res) => {
    const { status, support_tutor_id } = req.body;
    await sessionModel.updateSession(req.params.id, status, support_tutor_id || null);
    res.redirect('/admin/sessions');
};

export const getAddSession = async (req, res) => {
    const slots = await sessionSlotModel.getAllSlots();
    const tutors = await userModel.getTutors();
    res.render('admin/addSession', { slots, tutors, error: null });
};

export const postAddSession = async (req, res) => {
    const { slot_id, session_date, support_tutor_id } = req.body;
    await sessionModel.createSession(slot_id, session_date, support_tutor_id || null);
    res.redirect('/admin/sessions');
};

export const getMessages = async (req, res) => {
    const messages = await contactModel.getAllMessages();
    res.render('admin/messages', { messages });
};