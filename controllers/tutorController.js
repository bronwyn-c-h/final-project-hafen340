import * as sessionModel from '../models/sessionModel.js';
import * as enrollmentModel from '../models/enrollmentModel.js';

export const getSessions = async (req, res) => {
    const sessions = await sessionModel.getSessionsByTutor(req.session.user.id);
    res.render('tutor/sessions', { sessions });
};

export const getSessionDetail = async (req, res) => {
    const students = await sessionModel.getSessionWithStudents(req.params.id);
    const session = students[0] || {};
    res.render('tutor/sessionDetail', { students, session, sessionId: req.params.id });
};

export const postProgressNote = async (req, res) => {
    const { enrollment_id, note } = req.body;
    await enrollmentModel.addProgressNote(enrollment_id, note);
    res.redirect(`/tutor/sessions/${req.params.id}`);
};