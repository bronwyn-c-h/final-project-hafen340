import { createRequest, getRequestsByUser } from '../models/requestModel.js';

const showRequestForm = (req, res) => {
  res.render('requests/new', { error: null });
};

const submitRequest = async (req, res, next) => {
  try {
    const { title, author_name, notes } = req.body;
    const userId = req.session.user.id;

    if (!title || title.trim().length === 0) {
      return res.render('requests/new', { error: 'Title is required' });
    }

    await createRequest(userId, title.trim(), author_name?.trim(), notes?.trim());
    res.redirect('/requests');
  } catch (err) {
    next(err);
  }
};

const showMyRequests = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const requests = await getRequestsByUser(userId);
    res.render('requests/list', { requests });
  } catch (err) {
    next(err);
  }
};

export { showRequestForm, submitRequest, showMyRequests };