# final-project-hafen340

## Project Description
Seabright Sand is a tutoring management platform designed for a small specialized 
tutoring center that uses the Barton Reading & Spelling System to help children 
with dyslexia and other learning difficulties. Parents can create accounts, add 
their children, and book tutoring sessions. Tutors can view their scheduled sessions 
and track student progress.

## Database Schema
![ERD Diagram](tutor(1).png)

## User Roles

### Admin (Lead Tutor)
- Manage semesters and session schedules
- Generate sessions for an entire semester
- Manage all user accounts and roles
- View all students
- View contact form submissions

### Support Tutor
- View assigned sessions
- View enrolled students per session
- Add progress notes for each student

### Parent
- Create and manage children profiles
- Book available sessions for their children
- View booking history
- Cancel upcoming bookings

## Test Account Credentials
| Role | Email |
|------|-------|
| Admin | admin@seabrightsand.com |
| Support Tutor | tutor@seabrightsand.com |
| Parent | (register a new account) |

All test accounts use the same password.

## Known Limitations
- Sessions are stored in memory on the free Render tier and may reset on inactivity
- No email notifications for bookings
- Parents cannot reschedule a booking, only cancel and rebook