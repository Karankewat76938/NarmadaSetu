# NarmadaSetu — API Specification (v1)

**Base URL:** `/api/v1`  
**Protocol:** REST / JSON  
**Auth Type:** Bearer JWT Token (`Authorization: Bearer <token>`)

---

## 1. Response Standard

### 1.1 Success Response (`200`, `201`)

```json
{
  "success": true,
  "message": "Resource fetched or updated successfully",
  "data": {}
}
```

### 1.2 Error Response (`400`, `401`, `403`, `404`, `422`, `500`)

```json
{
  "success": false,
  "message": "Descriptive error message",
  "error": {
    "code": "ERROR_CODE_IDENTIFIER"
  }
}
```

---

## 2. Endpoints Summary

### 2.1 System Health

- `GET /health`: Health check endpoint (`{ "status": "ok" }`).

### 2.2 Authentication (`/api/v1/auth`)

- `POST /register`: Tourist or Partner registration. Public requests cannot create admin accounts.
- `POST /login`: Email & password login. Returns JWT token.
- `GET /me`: Get authenticated user profile (`Bearer` token required).
- `PATCH /profile`: Update name, phone, or avatar.

### 2.3 Services (`/api/v1/services`)

- `GET /`: Search and filter marketplace listings (`search`, `category`, `city`, `minPrice`, `maxPrice`, `rating`, `sort`, `page`, `limit`).
- `GET /:id`: Get detailed single service with category-specific details and provider profile.
- `POST /`: Partner/Admin creates new listing (Approved partner status required).
- `PATCH /:id`: Partner updates own listing (or admin).
- `DELETE /:id`: Partner or admin deactivates listing.

### 2.4 Bookings (`/api/v1/bookings`)

- `POST /`: Tourist submits booking request. Final amounts calculated server-side.
- `GET /`: List bookings for current tourist or partner.
- `GET /:id`: View specific booking details.
- `PATCH /:id/status`: Partner or Admin updates booking status (`confirmed`, `rejected`, `completed`).
- `POST /:id/cancel`: Tourist or Admin cancels reservation (`pending` or `confirmed` only).

### 2.5 Partner Onboarding (`/api/v1/partners`)

- `POST /apply`: Submit or update partner verification credentials.
- `GET /me`: Get partner verification status, listings count, and earnings summary.
- `PATCH /me`: Update business details.

### 2.6 Reviews (`/api/v1/reviews`)

- `POST /`: Post review for an eligible completed booking (1-5 stars + comment).
- `GET /service/:id`: Get public verified reviews for a service.
- `DELETE /:id`: Delete or moderate review.

### 2.7 Platform Administration (`/api/v1/admin`)

- `GET /dashboard`: Aggregate platform statistics (Users, Partners, Bookings, Revenue).
- `GET /users`: List and search all platform users.
- `PATCH /users/:id/status`: Activate or suspend user accounts.
- `GET /partners`: Partner verification queue.
- `PATCH /partners/:id/status`: Approve or reject partner applications.
- `GET /services`: All services for moderation.
- `PATCH /services/:id/status`: Moderate or disable listings.
