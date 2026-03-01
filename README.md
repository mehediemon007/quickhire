# QuickHire — Job Board Application

A full-stack job board application built with Next.js and Express.js.

## Tech Stack

**Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Material UI, Redux Toolkit, React Query, React Hook Form, Zod, Framer Motion

**Backend:** Express.js, MongoDB (Mongoose), Zod validation, TypeScript

---

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB running locally (or a MongoDB Atlas connection string)

---

### 1. Server Setup

```bash
cd server
npm install
```

Create a `.env` file (already exists):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/job-board
```

**Seed the database:**
```bash
npx tsx seeder.ts
```

**Start the server:**
```bash
npm run dev
```

API will be running at: `http://localhost:5000`

---

### 2. Client Setup

```bash
cd client
npm install
```

The `.env.local` file (already created):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Start the client:**
```bash
npm run dev
```

Client will be running at: `http://localhost:3000`

---

## API Endpoints

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List all jobs (supports `?search=`, `?category=`, `?location=` filters) |
| GET | `/api/jobs/:id` | Get single job by ID |
| POST | `/api/jobs` | Create a new job |
| DELETE | `/api/jobs/:id` | Delete a job |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications` | Submit a job application |

---

## Project Structure

```
QuickHire/
├── server/
│   ├── models/          # Mongoose models (Job, Application)
│   ├── controllers/     # Route handlers
│   ├── routes/          # Express routes
│   ├── validators/      # Zod schemas
│   ├── seeder.ts        # Database seeder
│   └── server.ts        # Express app entry point
│
└── client/
    └── src/
        ├── app/         # Next.js App Router pages
        │   ├── page.tsx         # Home / Job Listings
        │   ├── jobs/[id]/       # Job Detail & Apply Form
        │   └── admin/           # Admin Dashboard
        ├── components/  # Reusable UI components
        ├── hooks/        # React Query hooks
        ├── lib/          # Redux store & Axios client
        └── types/        # TypeScript interfaces
```
