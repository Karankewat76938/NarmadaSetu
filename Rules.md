# NarmadaSetu — Development Rules

**Document Version:** 1.0  
**Project:** NarmadaSetu  
**Architecture:** MERN Stack  
**Basis:** NarmadaSetu PRD v1.0 and `ARCHITECTURE.md`  
**Status:** Development Rules

---

## 1. Purpose

This document defines the coding, architecture, security, API, database, frontend, testing, Git, and development rules for NarmadaSetu.

These rules are intended to keep the MERN application:

- Maintainable
- Secure
- Modular
- Consistent
- Testable
- Responsive
- Accessible
- Production-ready

The rules follow the requirements defined in the NarmadaSetu PRD and architecture.

---

# 2. Core Development Principles

## Rule 2.1 — Follow the PRD

Every feature must be checked against `PRD.md` before implementation.

Do not introduce an MVP feature that is outside the defined product scope without explicitly updating the product requirements.

## Rule 2.2 — Follow the Architecture

Code must follow `ARCHITECTURE.md`.

Do not bypass established application layers merely to implement a feature faster.

## Rule 2.3 — Keep the MVP Focused

The MVP focuses on:

- Authentication
- Role-based authorization
- Tourist profiles
- Partner registration
- Partner verification
- Service listings
- Service discovery
- Search and filtering
- Booking
- Booking status management
- Booking history
- Partner booking management
- Reviews and ratings
- Admin dashboard
- Responsive web interface

Post-MVP functionality must not block the core marketplace.

## Rule 2.4 — Prefer Simple Solutions

Use the simplest implementation that satisfies the PRD.

Do not introduce unnecessary libraries, services, abstractions, or architectural complexity.

---

# 3. MERN Stack Rules

## Rule 3.1 — Frontend

Use:

- React.js
- Vite
- React Router
- Axios or Fetch API
- Context API or another lightweight state solution
- Responsive CSS

## Rule 3.2 — Backend

Use:

- Node.js
- Express.js
- REST API
- JWT authentication
- bcrypt/bcryptjs

## Rule 3.3 — Database

Use:

- MongoDB
- Mongoose

## Rule 3.4 — API Versioning

All application APIs must use:

```text
/api/v1
```

Example:

```text
GET /api/v1/services
```

## Rule 3.5 — Development Tools

The project uses:

- Git
- GitHub
- VS Code
- Postman/Insomnia
- ESLint
- Prettier

---

# 4. Repository Structure Rules

The project should preserve the defined frontend/backend separation.

```text
narmadasetu/
├── frontend/
├── backend/
└── docs/
```

Backend:

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── tests/
├── package.json
└── .env.example
```

Frontend:

```text
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── context/
│   ├── hooks/
│   ├── routes/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

Do not randomly create feature files in unrelated directories.

---

# 5. Backend Architecture Rules

## Rule 5.1 — Routes Are Not Business Logic

Routes should define endpoints and connect middleware/controllers.

Do not put complex business logic directly inside route files.

Bad:

```js
router.post("/bookings", async (req, res) => {
  // large booking workflow
});
```

Preferred:

```js
router.post(
  "/bookings",
  authenticate,
  validateBooking,
  bookingController.create
);
```

## Rule 5.2 — Controllers Stay Thin

Controllers should:

1. Receive the request.
2. Use validated input.
3. Call the appropriate service.
4. Return the API response.

Business rules belong in service modules.

## Rule 5.3 — Services Own Business Logic

Business logic should be implemented in services.

Examples:

```text
auth.service.js
booking.service.js
notification.service.js
```

If a business operation becomes complex, do not move the complexity into the route.

## Rule 5.4 — Models Own Data Structure

Mongoose models define database structure, validation, and appropriate persistence-level rules.

Do not put unrelated application workflows inside models.

## Rule 5.5 — Middleware Must Be Reusable

Authentication, authorization, validation, and error handling should be implemented as reusable middleware.

---

# 6. Authentication Rules

## Rule 6.1 — Passwords Must Be Hashed

Never store plaintext passwords.

Use:

```text
bcrypt / bcryptjs
```

The database must contain a password hash, not the original password.

## Rule 6.2 — Password Hashes Must Never Be Exposed

API responses must never return:

```text
passwordHash
```

## Rule 6.3 — Use Signed JWTs

JWTs must be signed using the configured secret.

JWT configuration must come from environment variables.

## Rule 6.4 — Protect Private Routes

Every private API endpoint must verify authentication.

## Rule 6.5 — Never Trust Client Identity

The backend must derive the authenticated user from the validated authentication mechanism.

Do not trust:

```json
{
  "userId": "..."
}
```

from a client request when the server can determine the identity from authentication.

## Rule 6.6 — Admin Registration Is Controlled

Public registration must never allow:

```text
role = admin
```

Admin accounts must be created through a controlled process.

---

# 7. Authorization Rules

Every protected operation must verify:

1. User identity.
2. User role.
3. Resource ownership where applicable.

## Rule 7.1 — Role Checks

Core roles:

```text
tourist
partner
admin
```

## Rule 7.2 — Ownership Checks

A partner can modify only their own resources.

Example:

```text
Partner A
  └── Service A  → allowed

Partner A
  └── Service B owned by Partner B → forbidden
```

## Rule 7.3 — Backend Is the Security Boundary

Frontend route protection is for user experience.

It is not a substitute for backend authorization.

Every protected backend operation must perform its own authorization checks.

## Rule 7.4 — Return Correct Authorization Errors

Use:

```text
401 → unauthenticated
403 → authenticated but unauthorized
```

---

# 8. User Role Rules

## 8.1 Tourist

A tourist may:

- Register
- Login
- View services
- Search services
- Filter services
- View provider information
- Create eligible bookings
- View own bookings
- Cancel eligible bookings
- View booking history
- Review eligible completed bookings
- Save services
- Manage profile

A tourist must not:

- Create partner services
- Edit another user's resources
- Verify partners
- Manage users

## 8.2 Partner

A partner may:

- Apply as a partner
- Manage provider profile
- Submit service information
- Add pricing
- Add images
- Define service location
- Manage availability
- View incoming bookings
- Accept bookings
- Reject bookings
- Mark eligible bookings completed
- View completed bookings
- Monitor basic earnings
- Edit own services

## 8.3 Admin

Admin may:

- Manage users
- Review partner applications
- Approve partners
- Reject partners
- Suspend partners
- Moderate services
- Monitor bookings
- View platform activity
- View dashboard metrics
- Moderate reviews
- Manage basic platform configuration

---

# 9. Partner Verification Rules

Partner onboarding must follow:

```text
Registration
    ↓
Profile Information
    ↓
Service Information
    ↓
Document Information
    ↓
Application Submitted
    ↓
Admin Review
    ↓
Approved / Rejected
```

Allowed application states:

```text
pending
approved
rejected
suspended
```

## Rule 9.1 — Unapproved Partners Cannot Publish

Only approved partners may publish services to the public marketplace.

## Rule 9.2 — Verification Is Server-Side

Do not allow the frontend to decide that a partner is verified.

The backend must check the persisted verification state.

---

# 10. Service Rules

Initial service categories are:

```text
Boat Ride
Homestay
Food
Local Guide
Narmada Aarti
Other Local Experiences
```

## Rule 10.1 — Required Common Service Information

A service must support:

```text
service name/title
category
description
provider
price
location
images
availability
rating
review count
verification status
created date
updated date
```

## Rule 10.2 — Provider Ownership

Every service must have a provider reference.

## Rule 10.3 — Service Editing

A partner may edit only their own service.

Admin may manage services according to administrative permissions.

## Rule 10.4 — Service Status

Disabled or inactive services must not be bookable.

The backend must verify service activity before creating a booking.

---

# 11. Category-Specific Service Rules

## Boat Services

Where applicable, support:

- Boat name
- Boat type
- Passenger capacity
- Ride duration
- Boarding location
- Safety information
- Pricing model
- Availability

## Homestays

Where applicable, support:

- Property name
- Room type
- Guest capacity
- Amenities
- Check-in information
- Check-out information
- House rules

## Food

Where applicable, support:

- Food type
- Menu
- Serving capacity
- Pickup/delivery information
- Available timings

Do not require category-specific fields for unrelated categories unless the PRD is updated.

---

# 12. Service Discovery Rules

The service marketplace must support:

## Search

```text
Service name
Location
Category
Provider
```

## Filters

```text
Service category
Location
Price range
Rating
Availability
```

## Sorting

```text
Price low to high
Price high to low
Rating
Recently added
```

## Rule 12.1 — Pagination

Do not return an unbounded service list.

Large datasets must use pagination.

## Rule 12.2 — Database Indexes

Frequently queried MongoDB fields should be indexed where appropriate.

---

# 13. Location Rules

Initial location data may contain:

```text
location name
address/area
latitude
longitude
```

Location data should be structured so that future map-based discovery can be added.

Do not implement live location tracking as an MVP requirement.

---

# 14. Booking Rules

Booking is a server-controlled transaction workflow.

Expected flow:

```text
Discover Service
    ↓
Service Details
    ↓
Select Date / Time
    ↓
Enter Booking Information
    ↓
Review
    ↓
Submit
    ↓
Server Validation
    ↓
Booking Created
    ↓
Partner Accepts / Rejects
    ↓
Tourist Sees Status
```

## Rule 14.1 — Server Is Authoritative

The client must never be trusted for:

- Final price
- Provider ownership
- Booking status
- Payment status
- User identity

## Rule 14.2 — Validate Service

Before creating a booking, verify:

- Service exists.
- Service is active.
- Provider is verified where required.
- Requested date/time is valid.
- Service is available.
- Tourist is authenticated.
- Duplicate/conflicting bookings are handled.

## Rule 14.3 — Calculate/Verify Price on Backend

The final amount must be calculated or verified using trusted service data.

Do not accept the client's final amount as authoritative.

---

# 15. Booking Status Rules

Allowed booking statuses:

```text
pending
confirmed
rejected
cancelled
completed
```

The backend must control status changes.

The frontend must not directly set an arbitrary booking status.

Example:

Bad:

```json
{
  "bookingStatus": "completed"
}
```

if the current user is not authorized to make that transition.

Preferred:

```text
PATCH /api/v1/bookings/:id/status
```

with backend validation of:

- User role
- Booking ownership/relationship
- Current status
- Requested transition

---

# 16. Payment Status Rules

Payment status is separate from booking status.

Allowed states:

```text
pending
paid
failed
refunded
not_required
```

Do not combine payment and booking state into one field.

Online payment is post-MVP, but the architecture must preserve this separation.

---

# 17. Booking Ownership Rules

A booking references:

```text
tourist
service
provider
```

The backend must verify access based on the authenticated user.

Examples:

```text
Tourist → own booking → allowed
Tourist → another tourist's booking → forbidden

Partner → booking for their service → allowed
Partner → unrelated booking → forbidden

Admin → platform booking monitoring → allowed
```

---

# 18. Booking Conflict Rules

The backend must check for duplicate/conflicting bookings according to the service's availability model.

Do not rely only on:

```text
frontend button disabling
```

or:

```text
frontend availability display
```

The final availability decision must be made server-side.

---

# 19. Booking Cancellation Rules

Cancellation must be performed through a backend operation.

The backend must determine whether the booking is eligible for cancellation.

Do not allow a client to cancel arbitrary bookings.

Endpoint:

```text
POST /api/v1/bookings/:id/cancel
```

---

# 20. Review Rules

A review is valid only when it is associated with an eligible completed booking.

Review fields:

```text
rating
comment
booking
service
tourist
created date
```

## Rule 20.1 — Rating Range

Rating must be:

```text
1–5
```

## Rule 20.2 — One Review Per Eligible Booking

A booking may have only one review.

## Rule 20.3 — Booking Ownership

A user cannot review a service they did not book.

## Rule 20.4 — Completed Booking Requirement

Only eligible completed bookings may create reviews.

## Rule 20.5 — Admin Moderation

Admins may moderate abusive or fraudulent reviews.

---

# 21. API Rules

Base path:

```text
/api/v1
```

## Authentication

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me
PATCH  /api/v1/auth/profile
```

## Services

```text
GET    /api/v1/services
GET    /api/v1/services/:id
POST   /api/v1/services
PATCH  /api/v1/services/:id
DELETE /api/v1/services/:id
```

## Bookings

```text
POST   /api/v1/bookings
GET    /api/v1/bookings
GET    /api/v1/bookings/:id
PATCH  /api/v1/bookings/:id/status
POST   /api/v1/bookings/:id/cancel
```

## Reviews

```text
POST   /api/v1/reviews
GET    /api/v1/services/:id/reviews
PATCH  /api/v1/reviews/:id
DELETE /api/v1/reviews/:id
```

## Partners

```text
POST   /api/v1/partners/apply
GET    /api/v1/partners/me
PATCH  /api/v1/partners/me
```

## Admin

```text
GET    /api/v1/admin/users
GET    /api/v1/admin/partners
PATCH  /api/v1/admin/partners/:id/status
GET    /api/v1/admin/services
PATCH  /api/v1/admin/services/:id/status
GET    /api/v1/admin/bookings
GET    /api/v1/admin/dashboard
```

---

# 22. API Response Rules

Successful responses should follow:

```json
{
  "success": true,
  "message": "Service fetched successfully",
  "data": {}
}
```

Error responses should follow:

```json
{
  "success": false,
  "message": "Service not found",
  "error": {
    "code": "SERVICE_NOT_FOUND"
  }
}
```

## Rule 22.1 — Use HTTP Status Codes Correctly

Use:

```text
200 → Successful request
201 → Resource created
400 → Invalid request
401 → Unauthenticated
403 → Unauthorized
404 → Resource not found
409 → Conflict
422 → Validation error
500 → Unexpected server error
```

## Rule 22.2 — Stable Error Codes

Application errors should use stable machine-readable codes.

Example:

```text
SERVICE_NOT_FOUND
BOOKING_CONFLICT
UNAUTHORIZED_RESOURCE
INVALID_BOOKING_STATUS
```

---

# 23. Request Validation Rules

All important request bodies must be validated.

Validate:

- Required fields
- Data types
- Allowed values
- IDs
- Dates
- Times
- Numeric values
- Rating range
- Uploaded file constraints

Do not assume frontend validation is sufficient.

Frontend validation improves UX.

Backend validation protects the application.

---

# 24. MongoDB Rules

Use Mongoose models.

Core models:

```text
User
Service
Booking
Review
PartnerApplication
```

## Rule 24.1 — Use References Correctly

Use references for relationships such as:

```text
Service → provider
Booking → tourist
Booking → service
Booking → provider
Review → tourist
Review → service
Review → booking
PartnerApplication → user
PartnerApplication → reviewedBy
```

## Rule 24.2 — Do Not Duplicate Authority

If provider ownership is represented by the service relationship, do not trust a client-provided provider ID.

The backend should derive or verify ownership.

## Rule 24.3 — Validate MongoDB IDs

Invalid MongoDB identifiers must be rejected before database operations where appropriate.

---

# 25. Database Field Rules

User must support:

```text
_id
name
email
phone
passwordHash
role
profileImage
accountStatus
createdAt
updatedAt
```

Service must support:

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

Booking must support:

```text
_id
tourist
service
provider
bookingDate
bookingTime
quantity
totalAmount
bookingStatus
paymentStatus
notes
createdAt
updatedAt
```

Review must support:

```text
_id
tourist
service
booking
rating
comment
status
createdAt
updatedAt
```

Partner application must support:

```text
_id
user
serviceCategory
personalDetails
documents
applicationStatus
reviewedBy
reviewedAt
rejectionReason
createdAt
updatedAt
```

Do not silently change these core meanings.

---

# 26. Frontend Rules

## Rule 26.1 — Components

Create reusable components for repeated UI behavior.

Suggested areas:

```text
components/common/
components/service/
components/booking/
components/dashboard/
```

## Rule 26.2 — Pages

Pages represent application screens.

Suggested areas:

```text
pages/Home/
pages/Explore/
pages/ServiceDetails/
pages/Auth/
pages/Tourist/
pages/Partner/
pages/Admin/
```

## Rule 26.3 — Layouts

Use:

```text
PublicLayout
TouristLayout
PartnerLayout
AdminLayout
```

## Rule 26.4 — API Calls

Keep API communication in frontend service modules.

Use:

```text
services/api.js
services/auth.api.js
services/services.api.js
services/bookings.api.js
```

Do not scatter raw API requests unnecessarily throughout UI components.

---

# 27. Frontend State Rules

Use Context API or another lightweight state solution where shared state is required.

Avoid unnecessary global state.

State should remain as local as possible unless it is genuinely shared.

Examples of appropriate shared state may include:

- Authenticated user state
- Role
- Session/token state
- Shared application-level UI state

Do not use global state merely because it is available.

---

# 28. Route Protection Rules

Frontend routes may be protected according to role.

Conceptually:

```text
Public
  └── Public routes

Authenticated
  ├── Tourist routes
  ├── Partner routes
  └── Admin routes
```

However:

```text
Frontend protection ≠ backend security
```

The backend must always repeat the required authorization checks.

---

# 29. UI/UX Rules

The interface should communicate:

- Local culture
- Tourism
- Trust
- Simplicity
- Professionalism

The interface should be:

- Modern
- Clean
- Mobile responsive
- Accessible
- Fast
- Easy to navigate

Avoid excessive visual effects that reduce usability.

---

# 30. Responsive Design Rules

The application must support:

```text
Mobile
Tablet
Laptop
Desktop
```

Mobile interfaces must provide:

- Touch-friendly buttons
- Responsive navigation
- Readable typography
- Mobile booking forms
- Responsive dashboards
- Optimized images

Do not build desktop-only workflows.

---

# 31. Accessibility Rules

Use practical accessibility principles.

Required:

- Semantic HTML
- Keyboard-accessible controls
- Visible focus states
- Proper form labels
- Meaningful button text
- Image alt text
- Sufficient text/background contrast
- Understandable error messages

Avoid buttons or controls whose purpose cannot be understood from their accessible name.

---

# 32. Image Rules

Images must be optimized where practical.

For uploads:

- Validate file type.
- Limit file size.
- Avoid unnecessarily large images.
- Provide meaningful alt text for meaningful UI images.

The PRD does not mandate a specific image-storage provider, so do not hard-code a provider requirement into the architecture.

---

# 33. Performance Rules

The application should aim for:

- Fast initial page load
- Optimized images
- Lazy loading where useful
- Pagination
- Database indexes
- Efficient API responses
- Minimal unnecessary frontend requests

Never return a large service dataset without pagination.

---

# 34. Error Handling Rules

Use centralized backend error handling.

Do not repeat the same error-processing logic in every controller.

The application should provide:

```text
User-friendly client messages
Stable error codes
Server-side logging
Safe production responses
```

Never expose sensitive stack traces in production.

---

# 35. Logging Rules

Log important operational events including:

- Server startup
- Database connection
- Authentication failures
- Booking failures
- Unexpected errors
- Important administrative actions

Do not log sensitive secrets.

Do not log passwords.

Do not expose JWT secrets.

---

# 36. Health Check Rules

The backend must expose:

```text
GET /health
```

Expected response:

```json
{
  "status": "ok"
}
```

The endpoint should provide a simple indication that the application server is operating.

---

# 37. Security Middleware Rules

Recommended backend middleware includes:

```text
Helmet
CORS configuration
Rate limiting
Request validation
Centralized error handling
```

Security middleware must be configured intentionally rather than blindly copied from examples.

---

# 38. Environment Rules

Use environment variables for environment-specific configuration.

Example:

```env
NODE_ENV=development
PORT=5000

MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d

CLIENT_URL=
```

## Rule 38.1 — Never Commit Secrets

Never commit:

```text
.env
JWT secrets
database credentials
private credentials
```

## Rule 38.2 — Commit `.env.example`

A safe `.env.example` should be committed.

It must contain variable names without real secrets.

---

# 39. CORS Rules

CORS must be configured according to the deployed frontend origin.

Do not use an unnecessarily broad production configuration.

The frontend origin should be controlled through environment-specific configuration such as:

```env
CLIENT_URL=
```

---

# 40. File Upload Rules

Uploaded files must be validated.

At minimum:

- Validate file type.
- Limit file size.
- Reject unsupported files.
- Do not trust client-provided file metadata blindly.

The exact external storage solution is not defined by the PRD and therefore should not be assumed.

---

# 41. Notification Rules

Notification functionality is a future extension.

Potential channels:

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

Notification logic must live behind a service-layer boundary.

Do not place notification implementation directly into unrelated route handlers.

---

# 42. Safety Rules

Safety is especially important for boat-related tourism.

Where applicable, services should preserve information related to:

- Boat capacity
- Safety information
- Partner verification
- Emergency contact information

Future safety functionality may include:

- Digital partner identity
- SOS
- Other operational safety features

Do not treat safety as only a UI concern.

Live tracking is outside the initial MVP.

---

# 43. Testing Rules

Testing must be introduced incrementally.

## Unit Tests

Test:

```text
Validation
Authentication utilities
Booking calculations
Permission logic
```

## API Tests

Test:

```text
Registration
Login
Service creation
Service access
Booking creation
Booking authorization
Admin operations
```

## Frontend Tests

Test important flows:

```text
Login
Service discovery
Booking
Dashboard navigation
```

---

# 44. Security Test Rules

At minimum, verify:

```text
Unauthenticated user → protected endpoint → 401

Wrong role → protected endpoint → 403

Partner A → Partner B service → forbidden

Tourist A → Tourist B booking → forbidden

Public registration → admin role → rejected

Client-provided price → ignored/verified by backend

Invalid booking state transition → rejected
```

---

# 45. API Testing Rules

Every new important API should be tested for:

1. Valid request.
2. Missing required fields.
3. Invalid field values.
4. Unauthenticated access.
5. Wrong-role access.
6. Resource ownership.
7. Not-found resources.
8. Conflict cases.
9. Successful response structure.
10. Error response structure.

---

# 46. Git Rules

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

## Rule 46.1 — Small, Focused Changes

Keep commits focused on one logical change.

## Rule 46.2 — Commit Messages

Use descriptive commit messages.

Examples:

```text
feat: add service listing API
feat: implement tourist booking flow
fix: prevent unauthorized booking access
refactor: centralize API error handling
```

## Rule 46.3 — Do Not Commit Secrets

Before pushing code, verify that environment secrets are not included.

---

# 47. Code Formatting Rules

Use:

- ESLint
- Prettier

Code should follow the repository's configured formatting rules.

Do not introduce inconsistent formatting between files.

Avoid unnecessary comments.

Comments should explain meaningful business or technical reasoning, not obvious code.

---

# 48. Naming Rules

Use clear, descriptive names.

Backend examples:

```text
auth.controller.js
booking.service.js
booking.routes.js
auth.middleware.js
```

Frontend examples:

```text
ServiceDetails/
TouristLayout.jsx
bookings.api.js
```

Names should communicate responsibility.

Avoid vague names such as:

```text
thing.js
stuff.js
helper2.js
temp.js
```

---

# 49. API Client Rules

Frontend API modules should centralize backend communication.

Examples:

```text
auth.api.js
services.api.js
bookings.api.js
```

Do not duplicate the same endpoint definition in multiple components.

API errors should be converted into understandable UI messages.

---

# 50. Data Exposure Rules

API responses should return only the data required by the client.

Never expose:

```text
passwordHash
JWT secrets
database credentials
internal secrets
```

Avoid returning unnecessary private information.

---

# 51. Admin Rules

Admin functionality is always protected.

Admin operations include:

- User management
- Partner verification
- Service moderation
- Booking monitoring
- Review moderation
- Dashboard metrics

Do not rely on a frontend-admin page being hidden as the security mechanism.

---

# 52. Partner Rules

Partners must be verified before public service publication.

Partners must not:

- Modify another partner's service.
- Change their own verification status.
- Change booking ownership.
- Manipulate payment status.
- Bypass backend availability checks.

---

# 53. Tourist Rules

Tourists must not:

- Create admin accounts.
- Modify services.
- Access other tourists' bookings.
- Review services without an eligible booking.
- Manipulate booking status.
- Manipulate payment status.
- Override server-calculated amounts.

---

# 54. Service Moderation Rules

Admin can:

- View services
- Approve services where required
- Disable inappropriate services
- Remove fraudulent listings

The backend must ensure moderation actions are authorized.

---

# 55. Review Moderation Rules

Admins can moderate abusive or fraudulent reviews.

Review moderation must not break the relationship between:

```text
Tourist
Service
Booking
Review
```

A review should remain traceable to its actual booking.

---

# 56. Documentation Rules

The project should maintain:

```text
docs/
├── PRD.md
├── ARCHITECTURE.md
├── API.md
├── DATABASE.md
├── SECURITY.md
├── DEPLOYMENT.md
└── CONTRIBUTING.md
```

The README should contain:

- Project introduction
- Features
- Technology stack
- Screenshots
- Installation
- Environment setup
- Development commands
- API overview
- Deployment
- Contribution guidelines

---

# 57. Feature Development Rules

Before implementing a feature:

```text
1. Check PRD
2. Check ARCHITECTURE.md
3. Identify role/permissions
4. Identify database changes
5. Identify API endpoint
6. Identify backend business logic
7. Identify frontend screens/components
8. Add validation
9. Add authorization
10. Add tests
11. Check responsive UI
12. Check security
13. Update documentation where necessary
```

---

# 58. Definition of Done

A feature is not complete until:

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
- Feature works in the deployed environment.

---

# 59. MVP Boundary Rules

Do not block the first release on:

- Live GPS boat tracking
- Full native mobile applications
- Complex recommendation algorithms
- Multi-currency payments
- Advanced AI features
- Automated dynamic pricing
- Large-scale travel package management
- Real-time chat
- Complex loyalty programs

Also treat the following as post-MVP:

- Online payment gateway
- Google Maps integration
- Digital partner ID
- SOS functionality
- Multilingual interface
- Notifications
- Promotional offers
- Advanced analytics
- Recommendation system
- Mobile application
- Advanced provider earnings reports

---

# 60. Future Feature Rules

Future functionality should extend the existing modular architecture.

Potential future areas include:

```text
Payments
Maps
Live location
Digital partner ID
SOS
Notifications
Promotional offers
Analytics
Recommendations
Mobile application
Multilingual support
Advanced earnings reports
```

Do not prematurely implement these as MVP requirements.

When added, future modules should preserve the existing boundaries for:

- Authentication
- Authorization
- Service management
- Booking logic
- Verification
- Notifications/integrations

---

# 61. No Hidden Business Logic Rule

Business rules must be explicit.

Important rules such as:

```text
Only approved partners can publish
Only eligible completed bookings can be reviewed
Partners can edit only their own services
Tourists can access only their own bookings
Final booking amount is server verified
```

must be enforced by backend code.

Do not depend on UI behavior to enforce business rules.

---

# 62. Client vs Server Responsibility

## Client Responsibilities

The frontend is responsible for:

- Displaying UI
- Collecting input
- Basic user-friendly validation
- Navigation
- Showing loading states
- Showing errors
- Calling APIs
- Displaying authorized application views

## Server Responsibilities

The backend is responsible for:

- Authentication
- Authorization
- Ownership
- Business rules
- Final validation
- Booking availability
- Price verification
- Status transitions
- Database persistence
- Security
- API response consistency

The server is authoritative.

---

# 63. Production Readiness Rules

Before production:

```text
Security middleware configured
Environment variables configured
Secrets removed from repository
Authentication tested
Authorization tested
Ownership checks tested
Validation tested
Central error handling enabled
Logging configured
Health endpoint available
API tested
Frontend responsive
Accessibility checked
Database indexes reviewed
Large datasets paginated
Production errors sanitized
Deployment configuration tested
```

---

# 64. Final Engineering Rule

NarmadaSetu is not only a collection of web pages.

It is a tourism marketplace whose core technical flow is:

```text
Tourist
   ↓
Discovery
   ↓
Trusted Service
   ↓
Booking
   ↓
Partner Management
   ↓
Completion
   ↓
Review
   ↓
Trust & Community Growth
```

The MERN stack provides the foundation.

The implementation must keep:

```text
Authentication
Authorization
Service Management
Booking Logic
Partner Verification
Reviews
Administration
Future Integrations
```

modular and maintainable.

The core discovery, verification, and booking workflows must remain stable before advanced features are introduced.
