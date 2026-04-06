import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import expressLayouts from 'express-ejs-layouts';
import dashboardRoutes from './routes/dashboardRoutes.js';
import parentRoutes from './routes/parentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import tutorRoutes from './routes/tutorRoutes.js';
import * as contactModel from './models/contactModel.js';
import { validateContact } from './middleware/validation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup (must be before routes)
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Make user available to all views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/parent', parentRoutes);
app.use('/admin', adminRoutes);
app.use('/tutor', tutorRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contactus', { success: null, error: null });
});

app.post('/contact', validateContact, async (req, res) => {
    const { user_name, user_email, user_message } = req.body;
    await contactModel.createMessage(user_name, user_email, user_message);
    res.render('contactus', { success: 'Your message has been sent!', error: null });
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).render('errors/404');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('errors/500', { error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/contact', validateContact, async (req, res) => {
    const { user_name, user_email, user_message } = req.body;
    await contactModel.createMessage(user_name, user_email, user_message);
    res.render('contactus', { success: 'Your message has been sent!', error: null });
});