/**
 * Global middleware that adds local variables to res.locals for use in all templates.
 */
const addLocalVariables = (req, res, next) => {
  // Current year for copyright
  res.locals.currentYear = new Date().getFullYear();

  // Make NODE_ENV available to all templates
  res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

  // Make query params available to all templates
  res.locals.queryParams = { ...req.query };

  // User authentication state
  res.locals.isLoggedIn = false;
  if (req.session && req.session.user) {
    res.locals.isLoggedIn = true;
    res.locals.user = req.session.user;
  }

  next();
};

export { addLocalVariables };