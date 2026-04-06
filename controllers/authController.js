import bcrypt from 'bcrypt';
import * as userModel from '../models/userModel.js';

export const getLogin = (req, res) => {
  res.render('auth/login', { error: null });
};

export const getRegister = (req, res) => {
  res.render('auth/register', { error: null });
};

export const postRegister = async (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  // Check passwords match
  if (password !== confirm_password) {
    return res.render('auth/register', { error: 'Passwords do not match' });
  }

  // Check if email already exists
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser) {
    return res.render('auth/register', { error: 'Email already in use' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await userModel.createUser(first_name, last_name, email, hashedPassword);

  // Set session
  req.session.user = {
    id: user.id,
    first_name: user.first_name,
    email: user.email,
    role: user.role
  };

  res.redirect('/');
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await userModel.getUserByEmail(email);
  if (!user) {
    return res.render('auth/login', { error: 'Invalid email or password' });
  }

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.render('auth/login', { error: 'Invalid email or password' });
  }

  // Set session
  req.session.user = {
    id: user.id,
    first_name: user.first_name,
    email: user.email,
    role: user.role
  };

  res.redirect('/');
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};