# NarmadaSetu — Architecture

**Document Version:** 1.0  
**Source:** NarmadaSetu Product Requirements Document (PRD), Version 1.0  
**Status:** Initial Architecture Definition  
**Product Type:** MERN Stack Tourism & Local Services Platform  
**Primary Market:** Narmada River tourism regions, Madhya Pradesh, India

---

## 1. Purpose

This document defines the application architecture for NarmadaSetu based strictly on the product requirements in `PRD.md`.

NarmadaSetu is a tourism marketplace connecting tourists with local providers for:

- Boat rides
- Homestays
- Local food
- Local guides
- Narmada Aarti
- Other local experiences

The architecture is designed around three roles:

- Tourist
- Partner
- Administrator

The first implementation objective is a reliable and maintainable marketplace covering discovery, partner verification, service management, booking, reviews, and role-based administration.

Advanced capabilities such as payments, maps, notifications, live boat tracking, SOS, multilingual support, mobile applications, recommendations, and advanced analytics are kept extensible but are not required for the initial MVP.

---

## 2. Architecture Principles

The architecture follows these principles derived from the PRD:

1. **MERN foundation**
   - React.js + Vite for the frontend.
   - Node.js + Express.js for the backend.
   - MongoDB + Mongoose for persistence.

2. **Role-based access**
   - Tourist, Partner, and Admin have different capabilities.
   - Protected operations verify identity, role, and resource ownership where applicable.

3. **Server-side business rules**
   - The client is never trusted for final price, user identity, ownership, booking status, or payment status.
   - Booking validation and final amount verification occur on the backend.

4. **Modular backend**
   - Route handlers should not contain all business logic.
   - Controllers, services, models, middleware, routes, and utilities remain separated.

5. **API versioning**
   - REST APIs use `/api/v1`.

6. **Trust and verification**
   - Partners require an application and admin review.
   - Only approved partners can publish services publicly.
   - Service and review moderation are administrative capabilities.

7. **Independent booking and payment state**
   - Booking status and payment status are separate fields.
   - Payment is not part of the MVP transaction implementation but the data model remains compatible with the PRD's payment states.

8. **Responsive and accessible UI**
   - Mobile phones, tablets, laptops, and desktop screens are supported.
   - Semantic HTML, keyboard accessibility, labels, focus states, alt text, contrast, and understandable errors are required.

9. **Production safety**
   - Passwords are hashed.
   - JWTs are signed.
   - Secrets remain outside source control.
   - Centralized error handling prevents sensitive stack traces from reaching production clients.

10. **Incremental extensibility**
    - Future integrations are introduced through service-layer boundaries rather than coupling them directly to route handlers.

---

## 3. System Context

```text
                         NarmadaSetu Users
                               |
             +-----------------+-----------------+
             |                 |                 |
             v                 v                 v
          Tourist           Partner            Admin
             |                 |                 |
             +-----------------+-----------------+
                               |
                               v
                    +----------------------+
                    | React + Vite Client  |
                    | Responsive Web UI    |
                    +----------+-----------+
                               |
                            REST API
                               |
                               v
                    +----------------------+
                    | Node.js + Express    |
                    | API Server            |
                    +----------+-----------+
                               |
          +--------------------+--------------------+
          |                    |                    |
          v                    v                    v
   Authentication       Service Management     Booking Management
          |                    |                    |
          +--------------------+--------------------+
                               |
                               v
                    +----------------------+
                    | MongoDB + Mongoose   |
                    +----------------------+
```

The system is a web-based MERN application. The React client communicates with the Express/Node.js API through REST. The API owns authentication, authorization, validation, marketplace rules, booking rules, and persistence access.

---

## 4. Logical Architecture

The backend is organized into layers.

```text
HTTP Request
    |
    v
Routes
    |
    v
Middleware
    |
    +--> Authentication
    +--> Role Authorization
    +--> Request Validation
    |
    v
Controllers
    |
    v
Services
    |
    +--> Business Rules
    +--> Booking Validation
    +--> Authorization/Ownership Checks
    +--> Notification Boundary
    |
    v
Models / Mongoose
    |
    v
MongoDB
```

### Responsibilities

| Layer | Responsibility |
|---|---|
| Routes | Define HTTP endpoints and connect requests to middleware/controllers |
| Middleware | Authentication, roles, validation, centralized error handling |
| Controllers | Receive validated requests, invoke business operations, return API responses |
| Services | Business logic and workflow rules |
| Models | MongoDB/Mongoose data representation |
| Database | Persistent application data |
| Utils | Shared utility functions |
| Frontend services | API communication from React |
| Frontend components | Reusable UI |
| Pages | Feature screens |
| Layouts | Public and role-specific application shells |

Business logic should not be placed directly into route definitions.

---

## 5. Repository Structure

The PRD defines separate frontend and backend application structures.

```text
narmadasetu/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── service/
│   │   │   ├── booking/
│   │   │   └── dashboard/
│   │   ├── layouts/
│   │   │   ├── PublicLayout.jsx
│   │   │   ├── TouristLayout.jsx
│   │   │   ├── PartnerLayout.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Explore/
│   │   │   ├── ServiceDetails/
│   │   │   ├── Auth/
│   │   │   ├── Tourist/
│   │   │   ├── Partner/
│   │   │   └── Admin/
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.api.js
│   │   │   ├── services.api.js
│   │   │   └── bookings.api.js
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── service.controller.js
│   │   │   ├── booking.controller.js
│   │   │   ├── partner.controller.js
│   │   │   └── admin.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validation.middleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Service.js
│   │   │   ├── Booking.js
│   │   │   ├── Review.js
│   │   │   └── PartnerApplication.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── service.routes.js
│   │   │   ├── booking.routes.js
│   │   │   ├── partner.routes.js
│   │   │   └── admin.routes.js
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── booking.service.js
│   │   │   └── notification.service.js
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   ├── package.json
│   └── .env.example
│
└── docs/
    ├── PRD.md
    ├── ARCHITECTURE.md
    ├── API.md
    ├── DATABASE.md
    ├── SECURITY.md
    ├── DEPLOYMENT.md
    └── CONTRIBUTING.md
```

---

## 6. Frontend Architecture

### 6.1 Technology

The frontend uses:

- React.js
- Vite
- React Router
- Axios or Fetch API
- Context API or another lightweight state solution
- Responsive CSS

### 6.2 Application Areas

The frontend is divided into:

```text
Public
├── Home
├── Explore
└── Service Details

Authentication
├── Register
└── Login

Tourist
├── Dashboard
├── Bookings
├── Profile
├── Saved Services
└── Reviews

Partner
├── Dashboard
├── Profile
├── Services
├── Availability
└── Bookings

Admin
├── Dashboard
├── Users
├── Partner Applications
├── Services
└── Bookings
```

### 6.3 Layouts

`PublicLayout` is used for public tourism discovery.

`TouristLayout` provides the tourist dashboard shell.

`PartnerLayout` provides partner management screens.

`AdminLayout` provides administrative management screens.

### 6.4 Routing and Access

React Router manages frontend navigation.

Frontend route protection is used for user experience, but it is not the security boundary. Every protected API operation must independently verify authentication, role, and ownership on the backend.

---

## 7. Backend Architecture

### 7.1 API Server

The backend is a Node.js application using Express.js.

Responsibilities include:

- REST API
- JWT authentication
- Role-based authorization
- Input validation
- Service management
- Partner applications
- Booking workflows
- Reviews
- Administrative operations
- Centralized errors
- Structured logging
- Health endpoint

### 7.2 Controllers

Controllers remain thin.

Examples:

- `auth.controller.js`
- `service.controller.js`
- `booking.controller.js`
- `partner.controller.js`
- `admin.controller.js`

Controllers should:

1. Read the request.
2. Use validated input.
3. Invoke the appropriate service.
4. Return the standardized response.

Business rules belong in services rather than being duplicated across controllers.

### 7.3 Services

The service layer contains reusable business operations.

The PRD explicitly defines:

- `auth.service.js`
- `booking.service.js`
- `notification.service.js`

The service layer is the boundary for future notification channels and other integrations.

---

## 8. Authentication and Authorization Architecture

### 8.1 Authentication

The authentication module provides:

- Registration
- Login
- Logout
- JWT-based authentication
- Password hashing
- Protected routes
- Token/session handling
- Profile management

Passwords are stored only as hashes.

JWTs are signed and validated by the backend.

Password hashes must never be returned in API responses.

### 8.2 Registration Rule

Public registration must never permit creation of an administrator account.

Admin accounts are created through a controlled process.

### 8.3 Authorization

Every protected operation checks:

```text
Authenticated?
     |
     +-- No --> 401
     |
    Yes
     |
     v
Correct role?
     |
     +-- No --> 403
     |
    Yes
     |
     v
Resource ownership required?
     |
   +--+--+
   |     |
  Yes    No
   |     |
   v     v
Owner?  Continue
   |
 +--+--+
 |     |
No    Yes
 |     |
403   Continue
```

Examples:

- A partner may edit only their own service.
- A tourist may access their own bookings.
- Admin operations require admin authorization.
- Partner verification is restricted to admins.

---

## 9. Role and Permission Architecture

The three core roles are:

```text
TOURIST
PARTNER
ADMIN
```

### Tourist

Can:

- Register and log in.
- View services.
- Search and filter services.
- View providers.
- Book services.
- View own bookings.
- Cancel eligible bookings.
- Review eligible completed bookings.
- Save services.
- Manage profile.

Cannot:

- Create or edit services.
- Verify partners.
- Manage users.

### Partner

Can:

- Register/apply as a partner.
- Maintain provider profile.
- Submit service information.
- Add pricing and images.
- Define service location.
- Manage availability.
- View incoming bookings.
- Accept/reject bookings.
- Mark bookings completed.
- View completed bookings.
- Monitor basic earnings.
- Edit their own services.

Publishing requires the partner to be approved.

### Admin

Can:

- Manage users.
- Review partner applications.
- Approve/reject/suspend partners.
- Approve or reject services where required.
- Moderate services.
- Monitor bookings.
- View platform activity.
- View dashboard metrics.
- Moderate reviews.
- Manage basic platform configuration.

---

## 10. Partner Onboarding Architecture

The partner lifecycle is:

```text
Partner Registration
        |
        v
Profile Information
        |
        v
Service Information
        |
        v
Document Information
        |
        v
Application Submitted
        |
        v
Admin Review
        |
    +---+---+
    |       |
 Approved Rejected
    |
    v
Partner Can Publish Services
```

Partner application states:

```text
pending
approved
rejected
suspended
```

Only approved partners may publish services to the public marketplace.

---

## 11. Service Marketplace Architecture

### 11.1 Service Categories

Initial categories:

```text
Boat Ride
Homestay
Food
Local Guide
Narmada Aarti
Other Local Experiences
```

### 11.2 Common Service Data

A service contains:

```text
_id
provider
category
title
description
price
location
images
availability
status
verificationStatus
createdAt
updatedAt
```

### 11.3 Category-Specific Data

Boat services may include:

- Boat name
- Boat type
- Passenger capacity
- Ride duration
- Boarding location
- Safety information
- Pricing model
- Availability

Homestays may include:

- Property name
- Room type
- Guest capacity
- Amenities
- Check-in information
- Check-out information
- House rules

Food services may include:

- Food type
- Menu
- Serving capacity
- Pickup/delivery information
- Available timings

The architecture should preserve these category-specific fields without changing the common service model.

---

## 12. Service Discovery Architecture

The discovery layer supports:

### Search

- Service name
- Location
- Category
- Provider

### Filters

- Service category
- Location
- Price range
- Rating
- Availability

### Sorting

- Price low to high
- Price high to low
- Rating
- Recently added

Large service lists must be paginated rather than returned as an unbounded response.

Frequently queried MongoDB fields should be indexed where appropriate.

---

## 13. Location Architecture

Initial service location data contains:

```text
location
├── locationName
├── addressOrArea
├── latitude
└── longitude
```

The architecture leaves room for future map-based discovery.

Future map functionality may use the same location information for:

- Service markers
- Boarding points
- Nearby services
- Route information
- Partner locations where appropriate

Real-time boat tracking is not part of the initial MVP.

---

## 14. Booking Architecture

Booking is the core transaction workflow.

```text
Discover Service
      |
      v
Service Details
      |
      v
Select Date / Time
      |
      v
Booking Information
      |
      v
Review Booking
      |
      v
Submit Booking
      |
      v
Server Validation
      |
      v
Booking Created
      |
      v
Partner Accepts / Rejects
      |
      v
Tourist Sees Status
```

### 14.1 Booking Data

```text
Booking
├── _id
├── tourist
├── service
├── provider
├── bookingDate
├── bookingTime
├── quantity
├── totalAmount
├── bookingStatus
├── paymentStatus
├── notes
├── createdAt
└── updatedAt
```

### 14.2 Booking Status

```text
pending
confirmed
rejected
cancelled
completed
```

### 14.3 Payment Status

```text
pending
paid
failed
refunded
not_required
```

Booking status and payment status remain separate.

---

## 15. Booking Validation Boundary

The backend is authoritative for booking validation.

The client must not be trusted for:

- Final price
- Provider ownership
- Booking status
- Payment status
- User identity

Before creating or changing a booking, the backend checks:

```text
Service exists
Service is active
Provider is verified where required
Requested date/time is valid
Service is available
Tourist is authenticated
Duplicate/conflicting bookings are handled
```

The server calculates or verifies the final amount from trusted service data.

---

## 16. Booking State Transitions

The PRD defines the initial booking states. The application should enforce valid state changes through backend business logic.

```text
pending
  |
  +--> confirmed
  |
  +--> rejected
  |
  +--> cancelled

confirmed
  |
  +--> completed
  |
  +--> cancelled
```

The backend is responsible for deciding whether a requested transition is allowed for the current role and resource.

---

## 17. Review and Rating Architecture

Reviews are linked to actual completed bookings.

Review data:

```text
Review
├── _id
├── tourist
├── service
├── booking
├── rating
├── comment
├── status
├── createdAt
└── updatedAt
```

Rules:

- Rating is 1–5.
- One review is allowed per eligible booking.
- A user cannot review a service they did not book.
- Reviews are linked to the actual booking.
- Admin can moderate abusive or fraudulent reviews.

The review operation therefore requires verification of the tourist, booking, service, completion state, and review uniqueness.

---

## 18. Dashboard Architecture

### 18.1 Tourist Dashboard

Provides:

- Upcoming bookings
- Recent bookings
- Booking status
- Saved services
- Booking history
- Profile
- Reviews

Booking records show:

- Booking ID
- Service
- Provider
- Date
- Time
- Amount
- Booking status
- Payment status

### 18.2 Partner Dashboard

Provides:

- Total services
- Pending bookings
- Confirmed bookings
- Completed bookings
- Basic earnings summary

Service management:

- Create
- Edit
- Update price
- Update availability
- Upload images
- Disable service

Booking management:

- View incoming bookings
- Accept
- Reject
- Mark completed
- View details

### 18.3 Admin Dashboard

Provides:

- User management
- Partner verification
- Service management
- Booking monitoring
- Platform metrics

Metrics include:

- Total users
- Total partners
- Total services
- Total bookings
- Completed bookings
- Cancelled bookings
- Platform activity

---

## 19. API Architecture

All APIs are versioned under:

```text
/api/v1
```

### Authentication

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me
PATCH  /api/v1/auth/profile
```

### Services

```text
GET    /api/v1/services
GET    /api/v1/services/:id
POST   /api/v1/services
PATCH  /api/v1/services/:id
DELETE /api/v1/services/:id
```

### Bookings

```text
POST   /api/v1/bookings
GET    /api/v1/bookings
GET    /api/v1/bookings/:id
PATCH  /api/v1/bookings/:id/status
POST   /api/v1/bookings/:id/cancel
```

### Reviews

```text
POST   /api/v1/reviews
GET    /api/v1/services/:id/reviews
PATCH  /api/v1/reviews/:id
DELETE /api/v1/reviews/:id
```

### Partner

```text
POST   /api/v1/partners/apply
GET    /api/v1/partners/me
PATCH  /api/v1/partners/me
```

### Admin

```text
GET    /api/v1/admin/users
GET    /api/v1/admin/partners
PATCH  /api/v1/admin/partners/:id/status
GET    /api/v1/admin/services
PATCH  /api/v1/admin/services/:id/status
GET    /api/v1/admin/bookings
GET    /api/v1/admin/dashboard
```

### Health

```text
GET /health
```

Expected health response:

```json
{
  "status": "ok"
}
```

---

## 20. API Response Architecture

Successful responses follow:

```json
{
  "success": true,
  "message": "Service fetched successfully",
  "data": {}
}
```

Errors follow:

```json
{
  "success": false,
  "message": "Service not found",
  "error": {
    "code": "SERVICE_NOT_FOUND"
  }
}
```

The API uses appropriate HTTP status codes:

```text
200  Successful request
201  Resource created
400  Invalid request
401  Unauthenticated
403  Unauthorized
404  Resource not found
409  Conflict
422  Validation error
500  Unexpected server error
```

---

## 21. Database Architecture

MongoDB is the primary database and Mongoose is the ODM.

### User

```text
User
├── _id
├── name
├── email
├── phone
├── passwordHash
├── role
├── profileImage
├── accountStatus
├── createdAt
└── updatedAt
```

### Service

```text
Service
├── _id
├── provider
├── category
├── title
├── description
├── price
├── location
├── images
├── availability
├── status
├── verificationStatus
├── createdAt
└── updatedAt
```

### Booking

```text
Booking
├── _id
├── tourist
├── service
├── provider
├── bookingDate
├── bookingTime
├── quantity
├── totalAmount
├── bookingStatus
├── paymentStatus
├── notes
├── createdAt
└── updatedAt
```

### Review

```text
Review
├── _id
├── tourist
├── service
├── booking
├── rating
├── comment
├── status
├── createdAt
└── updatedAt
```

### PartnerApplication

```text
PartnerApplication
├── _id
├── user
├── serviceCategory
├── personalDetails
├── documents
├── applicationStatus
├── reviewedBy
├── reviewedAt
├── rejectionReason
├── createdAt
└── updatedAt
```

Relationships are represented through references such as:

```text
Booking -> User (tourist)
Booking -> Service
Booking -> User (provider)

Review -> User (tourist)
Review -> Service
Review -> Booking

PartnerApplication -> User
PartnerApplication -> User (reviewedBy)

Service -> User (provider)
```

---

## 22. Data Ownership and Integrity

The backend must enforce ownership.

Examples:

```text
Partner A
   |
   +--> Service A  ✓ edit
   |
   +--> Service B  ✗ edit

Tourist A
   |
   +--> Booking A  ✓ view/manage according to permission
   |
   +--> Booking B  ✗ access
```

Authorization is not based only on frontend visibility.

Resource ownership must be checked on the server.

---

## 23. Security Architecture

### Authentication Security

- Hash passwords.
- Use signed JWTs.
- Protect private routes.
- Never expose password hashes.

### Authorization Security

Every protected operation verifies:

1. User identity.
2. User role.
3. Resource ownership where applicable.

### Input Security

- Validate request bodies.
- Sanitize appropriate inputs.
- Validate MongoDB identifiers.
- Limit uploaded file types and sizes.
- Do not trust client-side prices or permissions.

### API Security Middleware

The PRD recommends:

- Helmet
- CORS configuration
- Rate limiting
- Request validation
- Centralized error handling

### Secrets

Environment-specific configuration contains:

```env
NODE_ENV=development
PORT=5000

MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d

CLIENT_URL=
```

`.env` must not be committed.

`.env.example` is committed instead.

---

## 24. Error Handling Architecture

Errors are handled centrally.

```text
Request
   |
   v
Controller
   |
   +---- success ----> Standard response
   |
   +---- error ------> Central error middleware
                              |
                              +--> Log server-side
                              |
                              +--> Stable error code
                              |
                              +--> Safe client message
```

Production responses must not expose sensitive stack traces.

The system should provide:

- User-friendly client messages
- Stable API error codes
- Server-side logging
- No sensitive production stack traces

---

## 25. Logging and Monitoring Architecture

Structured logging covers:

- Server startup
- Database connection
- Authentication failures
- Booking failures
- Unexpected errors
- Important administrative actions

The backend exposes:

```text
GET /health
```

A successful health response is:

```json
{
  "status": "ok"
}
```

---

## 26. Notification Architecture

Notifications are designed as a service-layer boundary.

Potential channels defined by the PRD:

```text
In-app
Email
SMS
WhatsApp
```

Potential events:

```text
Registration
Partner approval
Booking created
Booking accepted
Booking rejected
Booking cancelled
Booking completed
Review reminder
```

Notification code should not be tightly coupled to individual route handlers.

For the initial MVP, notifications are an architectural extension point rather than a required core implementation.

---

## 27. Media and Image Handling Boundary

Services require images, and partners must be able to upload images.

The architecture therefore treats image handling as part of service management while enforcing:

- File type limits
- File size limits
- Validation before accepting uploads

The PRD does not specify a particular external image-storage provider, so the architecture does not mandate one.

---

## 28. Search, Pagination, and Database Performance

Service discovery is expected to handle search, filters, sorting, and potentially large service lists.

The API should support bounded result sets.

```text
Client
  |
  | search + filters + sort + pagination
  v
GET /api/v1/services
  |
  v
Service query
  |
  v
MongoDB
  |
  v
Paginated response
```

MongoDB indexes should be applied to fields that are frequently used for search/filter operations where appropriate.

The application should avoid unnecessary frontend requests and optimize images.

---

## 29. Responsive and Accessibility Architecture

The UI supports:

- Mobile phones
- Tablets
- Laptops
- Desktop screens

Mobile requirements include:

- Touch-friendly buttons
- Responsive navigation
- Readable typography
- Mobile booking forms
- Responsive dashboards
- Optimized images

Accessibility requirements include:

- Semantic HTML
- Keyboard-accessible controls
- Visible focus states
- Proper form labels
- Meaningful button text
- Image alt text
- Sufficient text/background contrast
- Understandable error messages

---

## 30. Home Page Architecture

The home page follows the PRD's recommended sections:

```text
Navigation
   ↓
Hero
   ↓
Search / Discovery
   ↓
Popular Experiences
   ↓
Tourism Categories
   ↓
How NarmadaSetu Works
   ↓
Featured Local Partners
   ↓
Community / Culture
   ↓
Safety / Trust
   ↓
Call to Action
   ↓
Footer
```

The UI should communicate:

- Local culture
- Tourism
- Trust
- Simplicity
- Professionalism

The visual design should remain modern, clean, responsive, accessible, and fast without excessive visual effects that reduce usability.

---

## 31. Testing Architecture

Testing is introduced incrementally.

### Unit Tests

Cover:

- Validation
- Authentication utilities
- Booking calculations
- Permission logic

### API Tests

Cover:

- Registration
- Login
- Service creation
- Service access
- Booking creation
- Booking authorization
- Admin operations

### Frontend Tests

Cover important user flows:

- Login
- Service discovery
- Booking
- Dashboard navigation

---

## 32. Development and Git Architecture

Recommended branches:

```text
main
develop
feature/*
fix/*
```

Examples:

```text
feature/booking-system
feature/authentication
fix/service-authorization
```

Commit messages describe the actual change:

```text
feat: add service listing API
feat: implement tourist booking flow
fix: prevent unauthorized booking access
refactor: centralize API error handling
```

---

## 33. Deployment Architecture

The PRD requires the application to be deployable as:

```text
React frontend hosting
        |
        | REST API
        v
Node.js / Express backend
        |
        v
Managed MongoDB
```

Environment-specific configuration is required.

Possible hosting services named in the PRD include:

- Render
- Vercel
- Equivalent services

The final hosting arrangement is intentionally left open by the PRD.

---

## 34. MVP Architecture Boundary

The initial production-ready architecture includes:

```text
Authentication
     +
Role Authorization
     +
Tourist Profiles
     +
Partner Applications
     +
Admin Verification
     +
Service Listings
     +
Service Discovery
     +
Search / Filters
     +
Booking Creation
     +
Booking Status Management
     +
Tourist Booking History
     +
Partner Booking Management
     +
Reviews / Ratings
     +
Admin Dashboard
     +
Responsive Web UI
```

The following are outside the initial MVP implementation boundary:

- Online payment gateway
- Google Maps integration
- Live boat location
- Digital partner ID
- SOS functionality
- Multilingual interface
- Notifications
- Promotional offers
- Advanced analytics
- Recommendation system
- Mobile application
- Advanced provider earnings reports
- Live GPS boat tracking
- Complex recommendation algorithms
- Multi-currency payments
- Advanced AI features
- Automated dynamic pricing
- Large-scale travel package management
- Real-time chat
- Complex loyalty programs

These capabilities should not block the core marketplace release.

---

## 35. Future Extension Architecture

The architecture preserves boundaries for future capabilities.

```text
Core Marketplace
├── Authentication
├── Services
├── Discovery
├── Bookings
├── Partners
├── Reviews
└── Administration
       |
       +--> Payments
       +--> Maps
       +--> Notifications
       +--> Digital IDs
       +--> SOS
       +--> Multilingual Support
       +--> Analytics
```

Future integrations should be added without moving their logic into unrelated route handlers.

The PRD specifically identifies future business and product possibilities including:

- Booking commissions
- Featured listings
- Tourism packages
- Optional provider subscriptions

These are business possibilities and are not MVP requirements.

---

## 36. Core Data and Workflow Relationships

The primary marketplace relationship is:

```text
User
 |
 +----------------------------+
 |                            |
 v                            v
Partner Application          Tourist
 |
 v
Approved Partner
 |
 v
Service
 |
 v
Booking <---------------- Tourist
 |
 v
Completed Booking
 |
 v
Review
 |
 v
Trust / Community Growth
```

A service belongs to a provider.

A booking references the tourist, service, and provider.

A review references the tourist, service, and booking.

This preserves the PRD's requirement that reviews be connected to actual completed bookings.

---

## 37. End-to-End Core Flows

### 37.1 Tourist Registration

```text
Tourist
  |
  v
React Registration
  |
  v
POST /api/v1/auth/register
  |
  v
Validation
  |
  v
Password Hash
  |
  v
User Creation
  |
  v
Authentication Response
```

The registration process cannot create an Admin account.

### 37.2 Partner Application

```text
Partner
  |
  v
Register / Login
  |
  v
Partner Application
  |
  v
POST /api/v1/partners/apply
  |
  v
PartnerApplication
  |
  v
Admin Review
  |
  +---- Approved ---> Partner may publish
  |
  +---- Rejected ---> Cannot publish
```

### 37.3 Service Publication

```text
Approved Partner
       |
       v
Create Service
       |
       v
Server Validation
       |
       v
Service Model
       |
       v
Service Status / Verification
       |
       v
Public Marketplace when permitted
```

### 37.4 Booking

```text
Tourist
  |
  v
Discover
  |
  v
Service Details
  |
  v
Date / Time
  |
  v
Booking Request
  |
  v
Backend Validation
  |
  +--> Service
  +--> Availability
  +--> Provider
  +--> Tourist
  +--> Amount
  |
  v
Booking Created: pending
  |
  v
Partner Decision
  |
  +--> confirmed
  |
  +--> rejected
```

### 37.5 Completion and Review

```text
Confirmed Booking
       |
       v
Experience Completed
       |
       v
Booking = completed
       |
       v
Tourist Eligible for Review
       |
       v
Review 1–5 + Comment
       |
       v
Review linked to Booking + Service + Tourist
```

---

## 38. Performance Architecture

The application should aim for:

- Fast initial page load
- Optimized images
- Lazy loading where useful
- Pagination for large datasets
- Database indexes for frequent queries
- Efficient API responses
- Minimal unnecessary frontend requests

Large service collections must never be returned in one unbounded API response.

---

## 39. Safety Architecture

Safety is particularly important for boat-related tourism.

The architecture preserves fields and operational boundaries for:

- Partner verification
- Digital partner identity
- Boat capacity information
- Safety instructions
- Emergency contact information
- SOS interface

Safety is treated as an operational feature rather than only a UI element.

Live tracking and SOS are future capabilities and are not part of the initial MVP unless their technical and safety requirements are clearly defined.

---

## 40. Definition of Done

A feature is architecturally complete only when:

- Frontend UI is implemented.
- Backend API is implemented.
- Required database model is implemented.
- Authentication/authorization is verified.
- Validation is implemented.
- Error handling is implemented.
- Mobile responsiveness is checked.
- API behavior is tested.
- No secrets are committed.
- Code is documented where necessary.
- The feature works in the deployed environment.

---

## 41. Implementation Sequence

The architecture follows the PRD roadmap.

### Phase 1 — Foundation

```text
Repository setup
Frontend setup
Backend setup
MongoDB connection
Environment configuration
API structure
Error handling
Health check
```

### Phase 2 — Authentication

```text
User model
Registration
Login
JWT
Protected routes
Role authorization
Profile
```

### Phase 3 — Services

```text
Service model
Service APIs
Service creation
Service editing
Service discovery
Search / filter
```

### Phase 4 — Booking

```text
Booking model
Booking creation
Availability validation
Partner booking management
Tourist booking history
Booking status workflow
```

### Phase 5 — Trust

```text
Partner applications
Admin verification
Reviews
Ratings
Service moderation
```

### Phase 6 — Production Hardening

```text
Security middleware
Validation
Logging
Testing
Performance optimization
Deployment
Monitoring
```

### Phase 7 — Advanced Features

```text
Payments
Maps
Notifications
Digital IDs
SOS
Multilingual support
Analytics
```

---

## 42. Architecture Acceptance Criteria

The architecture satisfies the PRD when:

1. Tourists can create accounts and log in.
2. Partners can submit partner applications.
3. Admins can approve or reject partners.
4. Approved partners can create services.
5. Tourists can discover and view services.
6. Tourists can submit bookings.
7. Partners can view and manage bookings.
8. Tourists can view booking status.
9. Completed bookings can receive reviews.
10. Unauthorized users cannot access protected resources.
11. Partners cannot modify another partner's resources.
12. Admin functionality is protected.
13. The application supports mobile and desktop interfaces.
14. Production errors do not expose sensitive server information.
15. The application supports environment-specific deployment configuration.

---

## 43. Architecture Decision Summary

| Concern | Architecture |
|---|---|
| Frontend | React.js + Vite |
| Routing | React Router |
| Frontend API client | Axios or Fetch API |
| Frontend state | Context API or lightweight state solution |
| Backend | Node.js + Express.js |
| API style | REST |
| API version | `/api/v1` |
| Authentication | JWT |
| Password security | bcrypt/bcryptjs |
| Database | MongoDB |
| ODM | Mongoose |
| Authorization | Role + ownership checks |
| Validation | Backend request validation |
| Error handling | Centralized middleware |
| Logging | Structured server-side logging |
| Health | `GET /health` |
| Deployment | Frontend hosting + Node/Express hosting + managed MongoDB |
| Testing | Unit + API + frontend flow tests |
| Responsive support | Mobile, tablet, laptop, desktop |

---

## 44. Architectural Boundary Statement

NarmadaSetu is a modular MERN tourism marketplace.

The core architecture is:

```text
React + Vite
      |
      | REST /api/v1
      v
Node.js + Express
      |
      +--> Authentication
      +--> Authorization
      +--> Services
      +--> Partners
      +--> Bookings
      +--> Reviews
      +--> Administration
      |
      v
MongoDB + Mongoose
```

The architecture keeps authentication, authorization, service management, booking logic, verification, and future integrations modular.

The first objective is a reliable and maintainable tourism marketplace. Advanced capabilities are added only after discovery, verification, and booking workflows are stable.

---

## 45. Source Traceability

This architecture is derived from the NarmadaSetu PRD, especially its:

- Product goals and scope
- User roles and permissions
- Core product modules
- Booking rules
- Partner verification workflow
- Dashboard requirements
- Search and filtering requirements
- Technology stack
- High-level architecture
- Backend and frontend structures
- Database design
- API design
- Security requirements
- UI/UX and responsive requirements
- Performance, logging, testing, and deployment requirements
- MVP roadmap
- Acceptance criteria
- Documentation requirements
- Final product principle

No additional product capability is defined here as an MVP requirement beyond what is specified in the PRD.
