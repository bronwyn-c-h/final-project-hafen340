export const validateRegister = (req, res, next) => {
    const { first_name, last_name, email, password, confirm_password } = req.body;

    if (!first_name || first_name.trim() === '') {
        return res.render('auth/register', { error: 'First name is required' });
    }
    if (!last_name || last_name.trim() === '') {
        return res.render('auth/register', { error: 'Last name is required' });
    }
    if (!email || email.trim() === '') {
        return res.render('auth/register', { error: 'Email is required' });
    }
    if (!password || password.length < 6) {
        return res.render('auth/register', { error: 'Password must be at least 6 characters' });
    }
    if (password !== confirm_password) {
        return res.render('auth/register', { error: 'Passwords do not match' });
    }

    next();
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || email.trim() === '') {
        return res.render('auth/login', { error: 'Email is required' });
    }
    if (!password || password.trim() === '') {
        return res.render('auth/login', { error: 'Password is required' });
    }

    next();
};

export const validateStudent = (req, res, next) => {
    const { first_name, last_name } = req.body;

    if (!first_name || first_name.trim() === '') {
        return res.render('parent/addStudent', { error: 'First name is required' });
    }
    if (!last_name || last_name.trim() === '') {
        return res.render('parent/addStudent', { error: 'Last name is required' });
    }

    next();
};

export const validateContact = (req, res, next) => {
    const { user_name, user_email, user_message } = req.body;

    if (!user_name || user_name.trim() === '') {
        return res.render('contactus', { error: 'Name is required', success: null });
    }
    if (!user_email || user_email.trim() === '') {
        return res.render('contactus', { error: 'Email is required', success: null });
    }
    if (!user_message || user_message.trim() === '') {
        return res.render('contactus', { error: 'Message is required', success: null });
    }

    next();
};

export const validateProgressNote = (req, res, next) => {
    const { note } = req.body;

    if (!note || note.trim() === '') {
        return res.redirect('back');
    }

    next();
};