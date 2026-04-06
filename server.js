import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import authRoutes from './routes/authroutes.js';
import expressLayouts from 'express-ejs-layouts';
import dashboardRoutes from './routes/dashboardRoutes.js';
import parentRoutes from './routes/parentRoutes.js';

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
    secure: false,
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

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contactus');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

