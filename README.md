# Job Application Tracker

![Dashboard Screenshot](https://i.imgur.com/Lcz1BXa.png)

A full-stack job application tracking system built with **Node.js**, **Express**, **MongoDB** (backend) and **Next.js**, **NextAuth.js** (frontend).

---

## Features

- User authentication with GitHub (NextAuth.js)
![Login Screenshot](https://i.imgur.com/OLo5UUa.png)
- Track job applications (CRUD)
![CRUD Screenshot](https://i.imgur.com/r0xAtgL.png)
- Stats dashboard (applications, interviews, etc.)
![Stats Screenshot](https://i.imgur.com/Lcz1BXa.png)
- Responsive UI with styled-components
- RESTful API backend

---

## Monorepo Structure

```
.
├── backend/         # Express.js + MongoDB API
└── job-tracker/     # Next.js
```

---

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/Redesu/Job-Application-Tracker
cd Job-Application-Tracker
```

### 2. Setup the Backend

```sh
cd backend
cp .env.example .env   # Create your .env file
npm install
npm run dev            # or: npm start
```

**Backend Environment Variables (`backend/.env`):**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 3. Setup the Frontend

```sh
cd ../job-tracker
cp .env.local.example .env.local   # Create your .env.local file
npm install
npm run dev
```

**Frontend Environment Variables (`job-tracker/.env.local`):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
```

---

## Usage

- Visit [http://localhost:3000](http://localhost:3000) to use the app.
- Login with GitHub to start tracking your job applications.

---

## API Endpoints

See [`backend/routes`](backend/routes) for all available endpoints.

- `POST /auth/handle-github-login` – GitHub OAuth integration
- `GET /api/jobs` – List jobs (auth required)
- `POST /api/jobs` – Add job (auth required)
- `PATCH /api/jobs/:id` – Update job (auth required)
- `DELETE /api/jobs/:id` – Delete job (auth required)
- `GET /api/publicStats` – Public stats (no auth)
- `GET /api/stats` – User stats (auth required)

---

## Running Tests

Backend tests (Jest + Supertest):

```sh
cd backend
npm test
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)