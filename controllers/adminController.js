console.log('adminController loaded');

import * as semesterModel from '../models/semesterModel.js';
import * as sessionSlotModel from '../models/sessionSlotModel.js';
import * as userModel from '../models/userModel.js';

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

