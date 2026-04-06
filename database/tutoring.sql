CREATE TABLE semesters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  parent_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE session_slots (
  id SERIAL PRIMARY KEY,
  semester_id INTEGER REFERENCES semesters(id) ON DELETE CASCADE,
  slot_time TIME NOT NULL,
  day_of_week VARCHAR(20) NOT NULL,
  max_students INTEGER DEFAULT 2,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  slot_id INTEGER REFERENCES session_slots(id) ON DELETE CASCADE,
  support_tutor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  session_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE session_enrollments (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES sessions(id) ON DELETE CASCADE,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'enrolled'
);

CREATE TABLE progress_notes (
  id SERIAL PRIMARY KEY,
  enrollment_id INTEGER REFERENCES session_enrollments(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT NOW()
);