import * as studentModel from '../models/studentModel.js';

export const getStudents = async (req, res) => {
    const students = await studentModel.getStudentsByParent(req.session.user.id);
    res.render('parent/students', { students });
};

export const getAddStudent = (req, res) => {
    res.render('parent/addStudent', { error: null });
};

export const postAddStudent = async (req, res) => {
    const { first_name, last_name, date_of_birth, notes } = req.body;
    await studentModel.createStudent(req.session.user.id, first_name, last_name, date_of_birth, notes);
    res.redirect('/parent/students');
};