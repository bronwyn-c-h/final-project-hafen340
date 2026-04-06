export const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    next();
};

export const requireAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/');
    }
    next();
};

export const requireSupportTutor = (req, res, next) => {
    if (!req.session.user || 
        (req.session.user.role !== 'support_tutor' && req.session.user.role !== 'admin')) {
        return res.redirect('/');
    }
    next();
};