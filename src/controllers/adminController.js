import pool from '../models/db.js';

const showAdminDashboard = async (req, res, next) => {
  try {
    const booksResult = await pool.query(
      `SELECT books.*, authors.name AS author_name 
       FROM books 
       LEFT JOIN authors ON books.author_id = authors.id
       ORDER BY books.title ASC`
    );
    const usersResult = await pool.query(
      `SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC`
    );
    const requestsResult = await pool.query(
      `SELECT book_requests.*, users.username 
       FROM book_requests
       JOIN users ON book_requests.user_id = users.id
       ORDER BY created_at DESC`
    );
    const authorsResult = await pool.query(`SELECT * FROM authors ORDER BY name ASC`);
    const genresResult = await pool.query(`SELECT * FROM genres ORDER BY name ASC`);

    res.render('admin/dashboard', {
      books: booksResult.rows,
      users: usersResult.rows,
      requests: requestsResult.rows,
      authors: authorsResult.rows,
      genres: genresResult.rows
    });
  } catch (err) {
    next(err);
  }
};

const addBook = async (req, res, next) => {
  try {
    const { title, author_name, description, published_year } = req.body;
    
    let authorId = null;
    
    if (author_name && author_name.trim().length > 0) {
      // Check if author already exists
      const existingAuthor = await pool.query(
        `SELECT id FROM authors WHERE LOWER(name) = LOWER($1)`,
        [author_name.trim()]
      );
      
      if (existingAuthor.rows.length > 0) {
        authorId = existingAuthor.rows[0].id;
      } else {
        // Create new author
        const newAuthor = await pool.query(
          `INSERT INTO authors (name) VALUES ($1) RETURNING id`,
          [author_name.trim()]
        );
        authorId = newAuthor.rows[0].id;
      }
    }

    await pool.query(
      `INSERT INTO books (title, author_id, description, published_year)
       VALUES ($1, $2, $3, $4)`,
      [title, authorId, description, published_year || null]
    );
    res.redirect('/admin');
  } catch (err) {
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    await pool.query(`DELETE FROM books WHERE id = $1`, [req.params.bookId]);
    res.redirect('/admin');
  } catch (err) {
    next(err);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    await pool.query(
      `UPDATE users SET role = $1 WHERE id = $2`,
      [role, req.params.userId]
    );
    res.redirect('/admin');
  } catch (err) {
    next(err);
  }
};

const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    await pool.query(
      `UPDATE book_requests SET status = $1, updated_at = NOW() WHERE id = $2`,
      [status, req.params.requestId]
    );
    res.redirect('/admin');
  } catch (err) {
    next(err);
  }
};

export { showAdminDashboard, addBook, deleteBook, updateUserRole, updateRequestStatus };