//imports
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import pool from './src/models/db.js';

dotenv.config();

/**
 * Declare Important Variables
 */

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * Setup Express Server
 */
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
/**
 * Configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Routes
 */
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server and listen on the specified port
pool.query('SELECT NOW()')
  .then(result => console.log('Database connected:', result.rows[0]))
  .catch(err => console.error('Database connection error:', err));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});