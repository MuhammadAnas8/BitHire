# BitHire – Job Listing Web App

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white)

BitHire is a *full-stack job portal* built as an assessment project for *Bitbash*.  
It allows job seekers to browse, search, and filter job postings while enabling admins to add, edit, and delete jobs. You can watch the demo video [here]( https://drive.google.com/file/d/1R9i53ej9jnjjcPIyhVXOzX9Yt9UMUWZw/view?usp=sharing )

---

## 🚀 Features

- Browse jobs in a clean, card-based UI
- *Search* jobs by title
- *Filter* jobs by job type (e.g. Full-Time, Contract)
- *Sort* jobs by posting date or title (A–Z / Z–A)
- *Add / Edit / Delete* job postings
- *Pagination* for large job lists
- Responsive, modern UI with a Hero section
- Backend API with filtering, sorting, and pagination support

---

## 🛠 Tech Stack

### Frontend
- *React* (Vite) - Fast, modern build tool
- *Axios* - HTTP client for API calls
- *Pure CSS* - Custom styling without frameworks

### Backend
- *Flask* - Lightweight Python web framework
- *Flask-SQLAlchemy* - ORM for database operations
- *Flask-CORS* - Cross-Origin Resource Sharing support
- *PostgreSQL* - Robust relational database

---

## 📂 Project Structure


```BitHire/
│
├── backend/
│   ├── app.py              # Flask entry point
│   ├── models.py           # Database models (Job)
│   ├── routes/
│   │   └── job_routes.py   # Job CRUD, filtering, sorting, pagination
│   ├── requirements.txt    # Python dependencies
│   └── config.py           # Database configuration
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Root component
│   │   ├── components/
│   │   │   ├── JobList.jsx       # Job list container (API, state, scroll)
│   │   │   ├── JobCard.jsx       # Job display card
│   │   │   ├── JobForm.jsx       # Add/Edit job form
│   │   │   ├── JobActionBar.jsx  # Search, filter, sort, add controls
│   │   │   ├── FilterSortJob.js  # Helper for filtering/sorting API calls
│   │   │   ├── AddEditJob.js     # Helper for add/edit API logic
│   │   │   └── DeleteJob.js      # Helper for delete API logic
│   │   ├── api.js          # Axios API functions
│   │   └── styles/         # CSS styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙ Installation (Local Setup)

### Prerequisites

- *Python 3.11+* installed
- *Node.js 16+* and npm installed
- *PostgreSQL* database server running

### 1. Backend Setup

bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate   # (Linux/Mac)
venv\Scripts\activate      # (Windows)

# Install dependencies
pip install -r requirements.txt


*Database Configuration:*

Create a PostgreSQL database and update config.py:

python
SQLALCHEMY_DATABASE_URI = "postgresql://username:password@localhost:5432/bithire"


*Initialize Database:*

bash
# Run migrations (if using Flask-Migrate)
flask db upgrade

# Or create tables directly in Python shell
python
>>> from app import app, db
>>> with app.app_context():
>>>     db.create_all()


*Start Backend Server:*

bash
flask run


Backend runs on: http://127.0.0.1:5000

---

### 2. Frontend Setup

bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev


Frontend runs on: http://localhost:5173

---

## 📖 Usage

### For Developers

- *Add Job* → Click + Add Job, fill form, submit
- *Edit Job* → Click edit icon on a job card, modify, submit
- *Delete Job* → Click delete icon on a job card, confirm deletion
- *Search* → Type in search bar, click Search button
- *Filter* → Use dropdown (e.g. Full-Time / Contract / Remote)
- *Sort* → Sort by newest, oldest, title A–Z, title Z–A
- *Pagination* → Navigate across pages at bottom of job list

### For Job Seekers

- Browse jobs in the main list with card-based layout
- Use search and filters to find relevant positions
- Click *Apply* button → redirects to the external job application URL
- View job details including company, location, type, and tags

---

## 🌐 API Endpoints

### List Jobs

*GET* /jobs

*Query Parameters:*

| Parameter | Type | Description |
|-----------|------|-------------|
| title | string | Filter by job title (partial match) |
| company | string | Filter by company name |
| location | string | Filter by location |
| job_type | string | Filter by job type (e.g., Full-Time, Contract) |
| sort_by | string | Sort field: date_posted or title |
| sort_order | string | Sort order: asc or desc |
| page | integer | Pagination page (default: 1) |
| per_page | integer | Items per page (default: 15) |

*Response:*

```json
{
  "jobs": [...],
  "total": 50,
  "page": 1,
  "per_page": 15,
  "total_pages": 4
}
```

---

### Create Job

*POST* /jobs

*Request Body (JSON):*

```json
{
  "title": "Frontend Developer",
  "company": "Bitbash",
  "location": "Remote",
  "job_type": "Full-Time",
  "link": "https://example.com/apply",
  "posting_date": "2025-09-30",
  "tags": ["React", "JavaScript"]
}
```

*Response:*

```json
{
  "message": "Job created successfully",
  "job": { ... }
}
```

---

### Update Job

*PUT* /jobs/<id>

*Request Body (JSON):*

```json
{
  "title": "Senior Frontend Developer",
  "location": "Hybrid"
}
```

*Response:*

```json
{
  "message": "Job updated successfully",
  "job": { ... }
}
```

---

### Delete Job

*DELETE* /jobs/<id>

*Response:*

```json
{
  "message": "Job deleted successfully"
}
```

---

## 🗃 Database Schema

### Job Model

| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key (auto-increment) |
| title | String(200) | Job title |
| company | String(200) | Company name |
| location | String(200) | Job location |
| job_type | String(50) | Employment type (Full-Time, Contract, etc.) |
| link | String(500) | Application URL |
| posting_date | Date | Date job was posted |
| tags | ARRAY(String) | Job-related tags/skills |
| created_at | DateTime | Record creation timestamp |
| updated_at | DateTime | Record update timestamp |

---
### Job Schema
```Job Table Schema
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    job_type VARCHAR(50),
    link VARCHAR(500),
    posting_date DATE,
    tags TEXT[], -- PostgreSQL array type
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```
## 🎨 Frontend Components

### Component Hierarchy

```text
└── 📁components
    ├── AddEditJob.js (logic: add and edit jon)
    ├── DeleteJob.js  (logic: delete job)
    ├── FilterSortJob.js (logic: filter and sortJob)
    ├── helpers.js  (utils methods)
    ├── HeroSection.jsx (landing page)
    ├── JobActionBar.jsx  (Action bar to apply search, filter and sort)
    ├── JobCard.jsx (ui: jobcard)
    ├── JobForm.jsx (ui: form to create and edit job)
    └── JobList.jsx (ui: list rederer)
```


### Key Components

- *JobList.jsx*: Main container managing state, API calls, and pagination
- *JobCard.jsx*: Displays individual job with edit/delete actions
- *JobForm.jsx*: Modal form for adding/editing jobs
- *JobActionBar.jsx*: Search, filter, sort controls
- *api.js*: Centralized Axios configuration and API functions

---

## 🔧 Configuration

### Backend Environment Variables

Create a .env file in the backend directory:

env
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/bithire
SECRET_KEY=your-secret-key-here


### Frontend Environment Variables

Create a .env file in the frontend directory:

env
VITE_API_URL=http://127.0.0.1:5000




## 🚀 Deployment

### Backend (Render/Heroku)

1. Push code to GitHub repository
2. Connect repository to Render/Heroku
3. Set environment variables
4. Deploy with PostgreSQL addon

### Frontend (Netlify/Vercel)

1. Build production bundle: npm run build
2. Deploy dist folder to Netlify/Vercel
3. Set VITE_API_URL to production backend URL

---

## 🔮 Future Improvements

- [ ] Add user authentication (admin vs job seeker roles)
- [ ] Dedicated job detail page with full description
- [ ] Bookmark/save jobs functionality
- [ ] Email notifications for new job postings
- [ ] Advanced search with multiple filters
- [ ] Better form validation & error handling
- [ ] Job application tracking system
- [ ] Company profiles and ratings
- [ ] Resume upload and management
- [ ] Dark mode support


## 📝 License

This project is created as an assessment for *Bitbash* and is intended for educational purposes.

---

## 📧 Contact

*Project by:* Muhammad Anas 
*Email:* muhammadanas.tech@gmail.co 
*GitHub:* [@muhammadanas8](https://github.com/muhammadanas8)

---

⚡ BitHire – Full-stack job listing portal developed for Bitbash assessment.