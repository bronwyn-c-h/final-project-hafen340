import { getAllBooks, getBookById, getBookRatings, getBookReviews } from '../models/bookModel.js';

const showBooks = async (req, res, next) => {
  try {
    const books = await getAllBooks();
    res.render('books', { books });
  } catch (err) {
    next(err);
  }
};

const showBookDetail = async (req, res, next) => {
  try {
    const book = await getBookById(req.params.id);
    if (!book) {
      const err = new Error('Book not found');
      err.status = 404;
      return next(err);
    }
    const ratings = await getBookRatings(req.params.id);
    const reviews = await getBookReviews(req.params.id);
    res.render('bookDetail', { book, ratings, reviews });
  } catch (err) {
    next(err);
  }
};

export { showBooks, showBookDetail };