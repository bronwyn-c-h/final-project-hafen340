import bcrypt from 'bcrypt';
import * as userModel from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getLogin = (req, res) => {
    res.render('auth/login', { error: null });
};

export const getRegister = (req, res) => {
    res.render('auth/register', { error: null });
};

export const postRegister = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.render('auth/register', { error: 'Passwords do not match' });
    }

    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
        return res.render('auth/register', { error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(first_name, last_name, email, hashedPassword);

    req.session.user = {
        id: user.id,
        first_name: user.first_name,
        email: user.email,
        role: user.role
    };

    res.redirect('/dashboard');
});

export const postLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.getUserByEmail(email);
    if (!user) {
        return res.render('auth/login', { error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.render('auth/login', { error: 'Invalid email or password' });
    }

    req.session.user = {
        id: user.id,
        first_name: user.first_name,
        email: user.email,
        role: user.role
    };

    res.redirect('/dashboard');
});

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};