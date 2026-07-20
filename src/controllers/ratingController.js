import { submitRating, getUserRatingForBook } from '../models/ratingModel.js';

const submitContentRating = async (req, res, next) => {
  try {
    const { spice_level, violence_level, language_level } = req.body;
    const bookId = req.params.id;
    const userId = req.session.user.id;

    if (!spice_level || !violence_level || !language_level) {
      return res.redirect(`/books/${bookId}`);
    }

    await submitRating(userId, bookId, spice_level, violence_level, language_level);
    res.redirect(`/books/${bookId}`);
  } catch (err) {
    next(err);
  }
};

export { submitContentRating };