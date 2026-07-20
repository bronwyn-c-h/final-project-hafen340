const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.isLoggedIn = true;
    next();
  } else {
    res.redirect('/login');
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.redirect('/login');
    }
    if (!roles.includes(req.session.user.role)) {
      const err = new Error('You do not have permission to access this page.');
      err.status = 403;
      return next(err);
    }
    next();
  };
};

export { requireLogin, requireRole };