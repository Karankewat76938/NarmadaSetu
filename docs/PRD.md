# NarmadaSetu --- Product Requirements Document (PRD)

**Document Version:** 1.0\
**Product Status:** Initial Product Definition\
**Product Type:** MERN Stack Tourism & Local Services Platform\
**Primary Market:** Narmada River tourism regions, Madhya Pradesh,
India\
**Prepared For:** NarmadaSetu\
**Technology Direction:** MongoDB + Express.js + React.js + Node.js

------------------------------------------------------------------------

## 1. Product Summary

NarmadaSetu is a digital tourism platform designed to connect tourists
with trusted local tourism services around the Narmada River.

The platform will bring multiple local experiences into one system,
including:

-   Boat rides
-   Local guides
-   Traditional homestays
-   Local food
-   Narmada Aarti experiences
-   Other community-based tourism services

The product is designed around two connected goals:

1.  Make it easier for tourists to discover, compare, and book local
    experiences.
2.  Give local service providers a structured digital platform to
    present their services and manage bookings.

NarmadaSetu will use a role-based MERN architecture so that tourists,
service providers, and administrators have different capabilities.

------------------------------------------------------------------------

# 2. Problem Statement

Tourism services in river-side and rural destinations are often
distributed across individual local providers.

A tourist may face problems such as:

-   Difficulty finding reliable local boat services.
-   No centralized information about available experiences.
-   Limited visibility into service prices and availability.
-   Informal booking processes through phone calls or messages.
-   Difficulty comparing different providers.
-   Lack of a digital profile for local service providers.
-   No centralized booking history.
-   Limited review and rating information.
-   Difficulty managing multiple tourism services from one platform.

At the same time, local providers may not have a dedicated digital
system for:

-   Listing their services.
-   Managing customer requests.
-   Managing availability.
-   Tracking bookings.
-   Building a digital reputation.
-   Monitoring earnings.

NarmadaSetu aims to address these problems through a single tourism
marketplace.

------------------------------------------------------------------------

# 3. Product Vision

To build a trusted digital bridge between tourists and local Narmada
tourism communities.

The platform should make local tourism:

-   Easier to discover
-   Easier to book
-   Easier to manage
-   More transparent
-   More digitally accessible

The product should prioritize a simple experience for tourists while
providing practical management tools for local partners.

------------------------------------------------------------------------

# 4. Product Goals

## 4.1 Tourist Goals

Tourists should be able to:

-   Create an account.
-   Explore Narmada tourism experiences.
-   Search and filter services.
-   View service details.
-   View provider information.
-   Check price and availability.
-   Submit bookings.
-   Track booking status.
-   Cancel eligible bookings.
-   View booking history.
-   Review completed experiences.
-   Save interesting services.

## 4.2 Partner Goals

Local providers should be able to:

-   Register as a service partner.
-   Create a provider profile.
-   Submit service information.
-   Add pricing.
-   Add images.
-   Define service location.
-   Manage availability.
-   Accept or reject booking requests.
-   Track upcoming bookings.
-   View completed bookings.
-   Monitor basic earnings.

## 4.3 Admin Goals

Administrators should be able to:

-   Manage users.
-   Review partner applications.
-   Verify service providers.
-   Approve or reject services.
-   Monitor bookings.
-   Manage inappropriate listings.
-   Review platform activity.
-   Handle basic platform configuration.

------------------------------------------------------------------------

# 5. Target Users

## 5.1 Tourist

A person looking for tourism experiences and local services around the
Narmada River.

## 5.2 Boat Partner

A local boat operator who provides boat rides to tourists.

## 5.3 Homestay Partner

A local property owner providing accommodation or traditional stay
experiences.

## 5.4 Food Partner

A local food provider offering regional food experiences or meals.

## 5.5 Local Guide

A person providing local sightseeing, cultural, historical, or
geographical guidance.

## 5.6 Aarti/Event Partner

A provider responsible for a Narmada Aarti or other listed local tourism
experience.

## 5.7 Administrator

The platform operator responsible for verification, moderation, and
platform management.

------------------------------------------------------------------------

# 6. Product Scope

## 6.1 MVP Scope

The first production-ready version should contain:

-   User registration and login
-   Role-based authentication
-   Tourist profile
-   Partner registration
-   Admin partner verification
-   Service listing
-   Service details
-   Service search and filtering
-   Booking creation
-   Booking status management
-   Tourist booking history
-   Partner booking management
-   Basic reviews and ratings
-   Admin dashboard
-   Responsive web interface

## 6.2 Post-MVP Scope

The following features should be planned after the core marketplace is
stable:

-   Online payment gateway
-   Google Maps integration
-   Live boat location
-   Digital partner ID
-   SOS functionality
-   Multilingual interface
-   Notifications
-   Promotional offers
-   Advanced analytics
-   Recommendation system
-   Mobile application
-   Advanced provider earnings reports

------------------------------------------------------------------------

# 7. User Roles and Permissions

  Capability                  Tourist   Partner        Admin
  ------------------------- --------- --------- ------------
  Register                        Yes       Yes   Controlled
  Login                           Yes       Yes          Yes
  View services                   Yes       Yes          Yes
  Create service                   No       Yes          Yes
  Edit own service                 No       Yes          Yes
  Book service                    Yes        No          Yes
  View own bookings               Yes       Yes          Yes
  Manage booking              Limited       Yes          Yes
  Review service                  Yes        No          Yes
  Manage users                     No        No          Yes
  Verify partners                  No        No          Yes
  Moderate services                No        No          Yes
  View platform analytics          No   Limited          Yes

A partner's exact permissions may be extended based on their service
category.

------------------------------------------------------------------------

# 8. Core Product Modules

## 8.1 Authentication Module

The authentication system will provide:

-   Registration
-   Login
-   Logout
-   JWT-based authentication
-   Password hashing
-   Role-based authorization
-   Protected routes
-   Session/token handling
-   Profile management

### Security rule

Public registration must never allow a user to create an administrator
account.

Admin accounts must be created through a controlled process.

------------------------------------------------------------------------

# 9. Tourism Discovery Module

The discovery system is the main tourist-facing part of NarmadaSetu.

Tourists should be able to:

-   Browse categories.
-   Search services.
-   Filter by location.
-   Filter by service type.
-   Filter by price.
-   Sort available services.
-   Open detailed service pages.

### Service Categories

Initial categories:

1.  Boat Ride
2.  Homestay
3.  Food
4.  Local Guide
5.  Narmada Aarti
6.  Other Local Experiences

------------------------------------------------------------------------

# 10. Service Listing Module

Each service listing should contain relevant information.

### Common Fields

-   Service name
-   Category
-   Description
-   Provider
-   Price
-   Location
-   Images
-   Availability
-   Rating
-   Review count
-   Verification status
-   Created date
-   Updated date

### Boat Service Additional Fields

-   Boat name
-   Boat type
-   Passenger capacity
-   Ride duration
-   Boarding location
-   Safety information
-   Pricing model
-   Availability

### Homestay Additional Fields

-   Property name
-   Room type
-   Guest capacity
-   Amenities
-   Check-in information
-   Check-out information
-   House rules

### Food Service Additional Fields

-   Food type
-   Menu
-   Serving capacity
-   Pickup/delivery information
-   Available timings

------------------------------------------------------------------------

# 11. Booking Module

The booking system is the main transaction workflow.

### Tourist Booking Flow

``` text
Discover Service
      ↓
Open Service Details
      ↓
Select Date / Time
      ↓
Enter Booking Information
      ↓
Review Booking
      ↓
Submit Booking
      ↓
Booking Created
      ↓
Partner Accepts / Rejects
      ↓
Tourist Receives Status
```

### Booking Status

The initial status model should be:

-   `pending`
-   `confirmed`
-   `rejected`
-   `cancelled`
-   `completed`

### Payment Status

Payment should be separated from booking status:

-   `pending`
-   `paid`
-   `failed`
-   `refunded`
-   `not_required`

This separation prevents payment state from being incorrectly mixed with
booking state.

------------------------------------------------------------------------

# 12. Booking Rules

The backend must validate bookings.

The client must not be trusted for:

-   Final price
-   Provider ownership
-   Booking status
-   Payment status
-   User identity

The server should calculate or verify the final amount from trusted
service data.

The backend should also check:

-   Service exists.
-   Service is active.
-   Provider is verified where required.
-   Requested date/time is valid.
-   Service is available.
-   Tourist is authenticated.
-   Duplicate/conflicting bookings are handled.

------------------------------------------------------------------------

# 13. Partner Management Module

A partner should first submit a registration/application.

### Partner onboarding

``` text
Partner Registration
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

Only approved partners should be allowed to publish services to the
public marketplace.

Possible verification states:

-   `pending`
-   `approved`
-   `rejected`
-   `suspended`

------------------------------------------------------------------------

# 14. Tourist Dashboard

The tourist dashboard should provide:

### Overview

-   Upcoming bookings
-   Recent bookings
-   Booking status
-   Saved services

### My Bookings

-   Booking ID
-   Service
-   Provider
-   Date
-   Time
-   Amount
-   Booking status
-   Payment status

### Profile

-   Name
-   Email
-   Phone
-   Profile image
-   Account information

### Reviews

Tourists should be able to review eligible completed bookings.

------------------------------------------------------------------------

# 15. Partner Dashboard

The partner dashboard should provide:

### Overview

-   Total services
-   Pending bookings
-   Confirmed bookings
-   Completed bookings
-   Basic earnings summary

### Service Management

Partners should be able to:

-   Create service
-   Edit service
-   Update price
-   Update availability
-   Upload images
-   Disable service

### Booking Management

Partners should be able to:

-   View incoming bookings
-   Accept bookings
-   Reject bookings
-   Mark completed bookings
-   View booking details

------------------------------------------------------------------------

# 16. Admin Dashboard

The admin dashboard is responsible for platform governance.

### User Management

-   View users
-   Search users
-   Activate/deactivate accounts
-   View user roles

### Partner Verification

-   View pending applications
-   Review submitted information
-   Approve partner
-   Reject partner
-   Suspend partner

### Service Management

-   View services
-   Approve services where required
-   Disable inappropriate services
-   Remove fraudulent listings

### Booking Monitoring

-   View platform bookings
-   Filter bookings
-   Check booking status
-   Investigate problematic transactions

### Dashboard Metrics

Possible metrics:

-   Total users
-   Total partners
-   Total services
-   Total bookings
-   Completed bookings
-   Cancelled bookings
-   Platform activity

------------------------------------------------------------------------

# 17. Review and Rating System

A tourist should be allowed to review a service after an eligible
completed booking.

### Review Fields

-   Rating: 1--5
-   Comment
-   Booking reference
-   Service reference
-   Tourist reference
-   Created date

### Rules

-   One review per eligible booking.
-   Users cannot review services they did not book.
-   Reviews should be linked to the actual booking.
-   Admin can moderate abusive or fraudulent reviews.

------------------------------------------------------------------------

# 18. Search and Filtering

The service marketplace should support:

### Search

-   Service name
-   Location
-   Category
-   Provider

### Filters

-   Service category
-   Location
-   Price range
-   Rating
-   Availability

### Sorting

-   Price: low to high
-   Price: high to low
-   Rating
-   Recently added

Search and filtering should eventually be implemented using indexed
MongoDB fields where appropriate.

------------------------------------------------------------------------

# 19. Location and Maps

Location functionality should be designed so it can later support
map-based discovery.

Initial service location data may contain:

-   Location name
-   Address/area
-   Latitude
-   Longitude

Future map functionality can provide:

-   Service markers
-   Boarding points
-   Nearby services
-   Route information
-   Partner location where appropriate

Real-time tracking should not be part of the first MVP unless the
technical and safety requirements are clearly defined.

------------------------------------------------------------------------

# 20. Notifications

The architecture should allow future notification support.

Potential notification channels:

-   In-app
-   Email
-   SMS
-   WhatsApp

Potential events:

-   Registration
-   Partner approval
-   Booking created
-   Booking accepted
-   Booking rejected
-   Booking cancelled
-   Booking completed
-   Review reminder

Notifications should be implemented through a service layer rather than
tightly coupling notification code to individual route handlers.

------------------------------------------------------------------------

# 21. Safety Features

Safety is especially important for boat-related tourism.

Future safety functionality may include:

-   Partner verification
-   Digital partner identity
-   Boat capacity information
-   Safety instructions
-   Emergency contact information
-   SOS interface

Safety features should be treated as operational features, not only UI
elements.

------------------------------------------------------------------------

# 22. Recommended Technology Stack

## Frontend

-   React.js
-   Vite
-   React Router
-   Axios or Fetch API
-   Context API or another lightweight state solution
-   Responsive CSS

## Backend

-   Node.js
-   Express.js
-   REST API
-   JWT authentication
-   bcrypt/bcryptjs

## Database

-   MongoDB
-   Mongoose

## Development Tools

-   Git
-   GitHub
-   VS Code
-   Postman/Insomnia
-   ESLint
-   Prettier

## Deployment

The application should be deployable using:

-   React frontend hosting
-   Node.js/Express backend hosting
-   MongoDB managed database

Render, Vercel, or equivalent services may be used depending on the
final deployment architecture.

------------------------------------------------------------------------

# 23. High-Level Architecture

``` text
                   ┌──────────────────────┐
                   │       Tourist        │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │    React Frontend    │
                   │       + Vite         │
                   └──────────┬───────────┘
                              │ REST API
                              ▼
                   ┌──────────────────────┐
                   │   Express / Node.js  │
                   │     API Server       │
                   └──────────┬───────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
       Authentication     Services         Bookings
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                   ┌──────────────────────┐
                   │      MongoDB         │
                   │      Database        │
                   └──────────────────────┘
```

------------------------------------------------------------------------

# 24. Backend Architecture

The backend should avoid putting all business logic directly inside
route files.

Recommended structure:

``` text
backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── service.controller.js
│   │   ├── booking.controller.js
│   │   ├── partner.controller.js
│   │   └── admin.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Booking.js
│   │   ├── Review.js
│   │   └── PartnerApplication.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── service.routes.js
│   │   ├── booking.routes.js
│   │   ├── partner.routes.js
│   │   └── admin.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── booking.service.js
│   │   └── notification.service.js
│   │
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── tests/
├── package.json
└── .env.example
```

------------------------------------------------------------------------

# 25. Frontend Architecture

Recommended structure:

``` text
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── service/
│   │   ├── booking/
│   │   └── dashboard/
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   ├── TouristLayout.jsx
│   │   ├── PartnerLayout.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Explore/
│   │   ├── ServiceDetails/
│   │   ├── Auth/
│   │   ├── Tourist/
│   │   ├── Partner/
│   │   └── Admin/
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.api.js
│   │   ├── services.api.js
│   │   └── bookings.api.js
│   │
│   ├── context/
│   ├── hooks/
│   ├── routes/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
└── vite.config.js
```

------------------------------------------------------------------------

# 26. Database Design

## User

``` text
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

## Service

``` text
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

## Booking

``` text
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

## Review

``` text
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

## Partner Application

``` text
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

------------------------------------------------------------------------

# 27. API Design

The API should use versioning from the beginning.

Base:

``` text
/api/v1
```

## Authentication

``` text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me
PATCH  /api/v1/auth/profile
```

## Services

``` text
GET    /api/v1/services
GET    /api/v1/services/:id
POST   /api/v1/services
PATCH  /api/v1/services/:id
DELETE /api/v1/services/:id
```

## Bookings

``` text
POST   /api/v1/bookings
GET    /api/v1/bookings
GET    /api/v1/bookings/:id
PATCH  /api/v1/bookings/:id/status
POST   /api/v1/bookings/:id/cancel
```

## Reviews

``` text
POST   /api/v1/reviews
GET    /api/v1/services/:id/reviews
PATCH  /api/v1/reviews/:id
DELETE /api/v1/reviews/:id
```

## Partner

``` text
POST   /api/v1/partners/apply
GET    /api/v1/partners/me
PATCH  /api/v1/partners/me
```

## Admin

``` text
GET    /api/v1/admin/users
GET    /api/v1/admin/partners
PATCH  /api/v1/admin/partners/:id/status
GET    /api/v1/admin/services
PATCH  /api/v1/admin/services/:id/status
GET    /api/v1/admin/bookings
GET    /api/v1/admin/dashboard
```

------------------------------------------------------------------------

# 28. API Response Standard

Successful response example:

``` json
{
  "success": true,
  "message": "Service fetched successfully",
  "data": {}
}
```

Error response example:

``` json
{
  "success": false,
  "message": "Service not found",
  "error": {
    "code": "SERVICE_NOT_FOUND"
  }
}
```

The API should use appropriate HTTP status codes.

Examples:

-   `200` --- successful request
-   `201` --- resource created
-   `400` --- invalid request
-   `401` --- unauthenticated
-   `403` --- unauthorized
-   `404` --- resource not found
-   `409` --- conflict
-   `422` --- validation error
-   `500` --- unexpected server error

------------------------------------------------------------------------

# 29. Security Requirements

The platform must implement basic production security.

### Authentication

-   Hash passwords.
-   Use signed JWTs.
-   Protect private routes.
-   Never expose password hashes in API responses.

### Authorization

Every protected operation must verify:

1.  User identity.
2.  User role.
3.  Resource ownership where applicable.

For example, a partner must not be able to edit another partner's
service.

### Input Security

-   Validate request bodies.
-   Sanitize appropriate inputs.
-   Validate MongoDB identifiers.
-   Limit uploaded file types and sizes.
-   Avoid trusting client-side prices or permissions.

### API Security

Recommended middleware:

-   Helmet
-   CORS configuration
-   Rate limiting
-   Request validation
-   Centralized error handling

------------------------------------------------------------------------

# 30. Environment Variables

Example:

``` env
NODE_ENV=development
PORT=5000

MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d

CLIENT_URL=
```

Secrets must never be committed to GitHub.

`.env` must be included in `.gitignore`.

A safe `.env.example` should be committed instead.

------------------------------------------------------------------------

# 31. UI/UX Requirements

The interface should communicate:

-   Local culture
-   Tourism
-   Trust
-   Simplicity
-   Professionalism

### Design Direction

The UI should be:

-   Modern
-   Clean
-   Mobile responsive
-   Accessible
-   Fast
-   Easy to navigate

The design should avoid excessive visual effects that reduce usability.

### Home Page

Recommended sections:

1.  Navigation
2.  Hero section
3.  Search/discovery
4.  Popular experiences
5.  Tourism categories
6.  How NarmadaSetu works
7.  Featured local partners
8.  Community/culture section
9.  Safety/trust section
10. Call to action
11. Footer

------------------------------------------------------------------------

# 32. Responsive Design

The platform must support:

-   Mobile phones
-   Tablets
-   Laptops
-   Desktop screens

Important mobile requirements:

-   Touch-friendly buttons
-   Responsive navigation
-   Readable typography
-   Mobile booking forms
-   Responsive dashboards
-   Optimized images

------------------------------------------------------------------------

# 33. Accessibility

The frontend should follow practical accessibility principles:

-   Semantic HTML
-   Keyboard-accessible controls
-   Visible focus states
-   Proper form labels
-   Meaningful button text
-   Image alt text
-   Sufficient text/background contrast
-   Error messages that are understandable

------------------------------------------------------------------------

# 34. Performance Requirements

The application should aim for:

-   Fast initial page load
-   Optimized images
-   Lazy loading where useful
-   Pagination for large datasets
-   Database indexes for frequent queries
-   Efficient API responses
-   Minimal unnecessary frontend requests

Large service lists should not be returned in one unbounded API
response.

------------------------------------------------------------------------

# 35. Error Handling

The backend should use centralized error handling.

Instead of repeating error handling in every route, controllers should
pass errors to a central middleware.

The system should provide:

-   User-friendly client messages
-   Stable API error codes
-   Server-side logging
-   No sensitive stack traces in production

------------------------------------------------------------------------

# 36. Logging and Monitoring

The backend should support structured logging for:

-   Server startup
-   Database connection
-   Authentication failures
-   Booking failures
-   Unexpected errors
-   Important administrative actions

A production deployment should also expose a health endpoint:

``` text
GET /health
```

Expected response:

``` json
{
  "status": "ok"
}
```

------------------------------------------------------------------------

# 37. Testing Requirements

Testing should be introduced incrementally.

## Unit Tests

Test:

-   Validation
-   Authentication utilities
-   Booking calculations
-   Permission logic

## API Tests

Test:

-   Registration
-   Login
-   Service creation
-   Service access
-   Booking creation
-   Booking authorization
-   Admin operations

## Frontend Tests

Test important user flows:

-   Login
-   Service discovery
-   Booking
-   Dashboard navigation

------------------------------------------------------------------------

# 38. Git and Development Workflow

Recommended branches:

``` text
main
develop
feature/*
fix/*
```

Example:

``` text
feature/booking-system
feature/authentication
fix/service-authorization
```

Commit messages should describe the actual change.

Examples:

``` text
feat: add service listing API
feat: implement tourist booking flow
fix: prevent unauthorized booking access
refactor: centralize API error handling
```

------------------------------------------------------------------------

# 39. Definition of Done

A feature is considered complete only when:

-   Frontend UI is implemented.
-   Backend API is implemented.
-   Database model is implemented where required.
-   Authentication/authorization is verified.
-   Validation is implemented.
-   Error handling is implemented.
-   Mobile responsiveness is checked.
-   API behavior is tested.
-   No secrets are committed.
-   Code is documented where necessary.
-   Feature works in the deployed environment.

------------------------------------------------------------------------

# 40. MVP Development Roadmap

## Phase 1 --- Foundation

-   Repository setup
-   Frontend setup
-   Backend setup
-   MongoDB connection
-   Environment configuration
-   API structure
-   Error handling
-   Health check

## Phase 2 --- Authentication

-   User model
-   Registration
-   Login
-   JWT
-   Protected routes
-   Role authorization
-   Profile

## Phase 3 --- Services

-   Service model
-   Service APIs
-   Service creation
-   Service editing
-   Service discovery
-   Search/filter

## Phase 4 --- Booking

-   Booking model
-   Booking creation
-   Availability validation
-   Partner booking management
-   Tourist booking history
-   Booking status workflow

## Phase 5 --- Trust

-   Partner applications
-   Admin verification
-   Reviews
-   Ratings
-   Service moderation

## Phase 6 --- Production Hardening

-   Security middleware
-   Validation
-   Logging
-   Testing
-   Performance optimization
-   Deployment
-   Monitoring

## Phase 7 --- Advanced Features

-   Payments
-   Maps
-   Notifications
-   Digital IDs
-   SOS
-   Multilingual support
-   Analytics

------------------------------------------------------------------------

# 41. Future Business Model

NarmadaSetu can eventually support several revenue models.

Potential models:

### Commission

A percentage of successful bookings may be charged to providers or
incorporated into the platform's transaction model.

### Featured Listings

Providers may pay for additional visibility.

### Tourism Packages

The platform may combine:

-   Boat ride
-   Food
-   Homestay
-   Guide
-   Aarti

into packaged experiences.

### Service Subscription

Professional providers may eventually have optional subscription plans.

These are business possibilities, not requirements for the MVP.

------------------------------------------------------------------------

# 42. Success Metrics

Initial product metrics can include:

### User Metrics

-   Registered tourists
-   Active tourists
-   Registered partners
-   Verified partners

### Marketplace Metrics

-   Active services
-   Service views
-   Search activity
-   Booking conversion

### Booking Metrics

-   Total bookings
-   Completed bookings
-   Cancellation rate
-   Average booking value

### Trust Metrics

-   Average rating
-   Review count
-   Verified partner percentage
-   Dispute/complaint rate

Metrics should be interpreted over defined time periods rather than as
isolated numbers.

------------------------------------------------------------------------

# 43. Risks and Mitigation

  Risk                           Mitigation
  ------------------------------ --------------------------------------
  Fake service providers         Partner verification
  Fraudulent listings            Admin moderation
  Double booking                 Server-side availability checks
  Incorrect pricing              Calculate/verify amount on backend
  Unauthorized data access       RBAC + ownership checks
  Poor mobile experience         Mobile-first responsive design
  Slow service discovery         Pagination + indexes
  Payment failures               Separate payment status
  Sensitive data exposure        Secure API responses and secrets
  Unreliable local information   Provider verification and moderation

------------------------------------------------------------------------

# 44. Out of Scope for Initial MVP

The following should not block the first release:

-   Live GPS boat tracking
-   Full native mobile applications
-   Complex recommendation algorithms
-   Multi-currency payments
-   Advanced AI features
-   Automated dynamic pricing
-   Large-scale travel package management
-   Real-time chat
-   Complex loyalty programs

These can be evaluated after the core booking marketplace is stable.

------------------------------------------------------------------------

# 45. Product Acceptance Criteria

The initial product will be considered functionally ready when:

1.  A tourist can create an account and log in.
2.  A partner can submit a partner application.
3.  An admin can approve or reject a partner.
4.  An approved partner can create a service.
5.  A tourist can discover and view services.
6.  A tourist can submit a booking.
7.  The partner can view and manage the booking.
8.  The tourist can view the booking status.
9.  Completed bookings can receive reviews.
10. Unauthorized users cannot access protected resources.
11. A partner cannot modify another partner's resources.
12. Admin functionality is protected.
13. The application works on mobile and desktop.
14. Production errors do not expose sensitive server information.
15. The application can be deployed with environment-specific
    configuration.

------------------------------------------------------------------------

# 46. Documentation Requirements

The project should maintain the following documentation:

``` text
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

-   Project introduction
-   Features
-   Technology stack
-   Screenshots
-   Installation
-   Environment setup
-   Development commands
-   API overview
-   Deployment
-   Contribution guidelines

------------------------------------------------------------------------

# 47. Final Product Principle

NarmadaSetu should not be treated only as a collection of web pages.

It should be developed as a complete platform with:

``` text
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

The MERN stack should provide the technical foundation, while the
product architecture should keep authentication, authorization, service
management, booking logic, verification, and future integrations
modular.

The first objective is a reliable and maintainable tourism marketplace.
Advanced features should be added only after the core discovery,
verification, and booking workflows are stable.

------------------------------------------------------------------------

# 48. Document Status

**Version:** 1.0\
**Status:** Initial PRD\
**Scope:** Product definition and technical requirements\
**Implementation status:** To be implemented and validated against the
final codebase
