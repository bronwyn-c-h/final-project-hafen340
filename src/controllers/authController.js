import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../models/userModel.js';

const showSignup = (req, res) => {
  res.render('signup', { error: null });
};

const showLogin = (req, res) => {
  res.render('login', { error: null });
};

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.render('signup', { error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.render('signup', { error: 'Password must be at least 6 characters' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, passwordHash);

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.redirect('/books');
  } catch (err) {
    if (err.code === '23505') {
      return res.render('signup', { error: 'Email or username already in use' });
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', { error: 'All fields are required' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.redirect('/books');
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.clearCookie('connect.sid');
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};

export { showSignup, showLogin, signup, login, logout };