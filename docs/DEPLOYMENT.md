# NarmadaSetu — Deployment Guide

**Basis:** PRD.md Section 22 & ARCHITECTURE.md Section 13

---

## 1. System Requirements

- Node.js >= 18.x
- MongoDB >= 6.0 (or MongoDB Atlas Cloud cluster)
- npm >= 9.x

---

## 2. Environment Setup

### 2.1 Backend (`backend/.env`)

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/narmadasetu?retryWrites=true&w=majority
JWT_SECRET=production_secure_random_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-domain.com
```

### 2.2 Frontend (`.env`)

```env
REACT_APP_API_URL=https://api.your-domain.com/api/v1
```

---

## 3. Build & Run

### 3.1 Backend Server

```bash
cd backend
npm install
npm run seed     # Initial demo & admin provisioning
npm start        # Launches Express server on port 5000
```

### 3.2 Frontend Client

```bash
npm install
npm run build    # Produces static production assets in build/
```

---

## 4. Health Checks & Monitoring

The backend exposes an operational health endpoint:

```text
GET /health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2026-09-21T10:30:00.000Z"
}
```
