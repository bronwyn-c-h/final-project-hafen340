import * as semesterModel from '../models/semesterModel.js';
import * as sessionSlotModel from '../models/sessionSlotModel.js';

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