import { createReview, updateReview, deleteReview } from '../models/reviewModel.js';

const submitReview = async (req, res, next) => {
  try {
    const { body } = req.body;
    const bookId = req.params.id;
    const userId = req.session.user.id;

    if (!body || body.trim().length === 0) {
      return res.redirect(`/books/${bookId}`);
    }

    await createReview(userId, bookId, body.trim());
    res.redirect(`/books/${bookId}`);
  } catch (err) {
    next(err);
  }
};

const editReview = async (req, res, next) => {
  try {
    const { body } = req.body;
    const { reviewId, bookId } = req.params;
    const userId = req.session.user.id;

    if (!body || body.trim().length === 0) {
      return res.redirect(`/books/${bookId}`);
    }

    await updateReview(reviewId, userId, body.trim());
    res.redirect(`/books/${bookId}`);
  } catch (err) {
    next(err);
  }
};

const removeReview = async (req, res, next) => {
  try {
    const { reviewId, bookId } = req.params;
    const userId = req.session.user.id;

    await deleteReview(reviewId, userId);
    res.redirect(`/books/${bookId}`);
  } catch (err) {
    next(err);
  }
};

export { submitReview, editReview, removeReview };