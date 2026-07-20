# SpiceShelf

## Project Description
A book discovery and content-rating platform that helps readers know what they're 
getting into before picking up a book. Users can browse books, see community-submitted 
content ratings (spice level, violence, language), leave reviews, and request books 
that aren't in the catalog yet. Built for readers who want more transparency about 
book content than a typical star rating gives them.

## Tech Stack
- Node.js / Express (ESM)
- EJS for server-side views
- PostgreSQL
- express-session for authentication
- Deployed on Render

## Database Schema
![ERD Diagram](erd.png)

## User Roles

**Admin**
- Full control over the system
- Add and delete books
- Manage user roles
- Manage book requests
- Access moderator features

**Moderator**
- Approve or reject pending content ratings
- Delete inappropriate reviews

**User**
- Browse books and view content ratings
- Submit content ratings (pending moderator approval)
- Write and delete their own reviews
- Request missing books

## Test Account Credentials
All accounts use the password: `123456`

| Role | Email |
|------|-------|
| Admin | admin@test.com |
| Moderator | moderator@test.com |
| User | user@test.com |

## Known Limitations
- No book editing from admin dashboard (only add/delete)
- No cover image upload support (URLs only)
- Email confirmation not implemented
- No pagination on book list

## Live Deployment
https://final-project-hafen340.onrender.com