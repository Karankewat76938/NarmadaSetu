# NarmadaSetu — Design System & UI/UX Specification

**Document Version:** 1.0  
**Product:** NarmadaSetu  
**Basis:** NarmadaSetu PRD v1.0 and ARCHITECTURE.md  
**Purpose:** Define the UI/UX rules, information architecture, visual system, responsive behavior, accessibility standards, and core screen specifications for the NarmadaSetu MERN tourism marketplace.

---

## 1. Design Objective

NarmadaSetu is a tourism marketplace connecting tourists with trusted local Narmada tourism services.

The design must make the platform:

- Modern
- Clean
- Easy to navigate
- Mobile responsive
- Accessible
- Fast
- Trust-oriented
- Simple for tourists
- Practical for local partners
- Efficient for administrators

The interface must avoid excessive visual effects that reduce usability.

### Primary UX principle

> Help the user discover the right local experience, understand the provider and price, and complete a booking with as little friction as possible.

---

# 2. Design Principles

## 2.1 Simplicity First

Every screen should have a clear primary purpose.

Avoid:

- Unnecessary decoration
- Excessive animations
- Overloaded cards
- Too many competing buttons
- Long forms without grouping

## 2.2 Trust Before Conversion

Tourism users need confidence before booking.

Trust should be communicated through:

- Provider information
- Verification status
- Ratings and review count
- Clear pricing
- Availability
- Service details
- Safety information where applicable

## 2.3 Mobile-First

Design for small screens first and progressively enhance for tablets, laptops, and desktops.

Important mobile requirements:

- Touch-friendly controls
- Responsive navigation
- Readable typography
- Mobile booking forms
- Responsive dashboards
- Optimized images

## 2.4 Content Is the Interface

Tourism decisions depend heavily on:

- Images
- Service name
- Category
- Location
- Price
- Availability
- Provider
- Rating
- Reviews

These must be visually easy to scan.

## 2.5 Consistency

The same action must look and behave consistently throughout the product.

Examples:

- Primary actions use the primary button style.
- Destructive actions use the destructive pattern.
- Status badges use consistent wording.
- Forms use consistent labels and validation.
- Cards use consistent spacing and hierarchy.

---

# 3. Target Users

## 3.1 Tourist

Primary goals:

- Explore experiences
- Search and filter services
- Compare options
- View service details
- Check price and availability
- Book
- Track bookings
- Review completed experiences
- Save interesting services

## 3.2 Partner

Primary goals:

- Complete partner onboarding
- Present services
- Add pricing and images
- Manage availability
- Manage booking requests
- Track upcoming and completed bookings
- View basic earnings

## 3.3 Administrator

Primary goals:

- Manage users
- Verify partners
- Moderate services
- Monitor bookings
- Review platform activity
- Manage basic platform configuration

---

# 4. Information Architecture

```text
NarmadaSetu
│
├── Public
│   ├── Home
│   ├── Explore
│   ├── Service Details
│   ├── Provider Information
│   ├── Login
│   └── Registration
│
├── Tourist
│   ├── Dashboard
│   ├── My Bookings
│   ├── Saved Services
│   ├── Reviews
│   └── Profile
│
├── Partner
│   ├── Dashboard
│   ├── Partner Profile
│   ├── Services
│   ├── Availability
│   └── Bookings
│
└── Admin
    ├── Dashboard
    ├── Users
    ├── Partner Applications
    ├── Services
    └── Bookings
```

---

# 5. Navigation

## 5.1 Public Navigation

Recommended structure:

```text
[Logo]  Explore  Categories  About/How it works
                         [Search] [Login] [Register]
```

On mobile:

```text
[Logo]                         [Menu]
```

The mobile menu should provide access to all primary public navigation items without requiring horizontal scrolling.

## 5.2 Authenticated Navigation

### Tourist

```text
Dashboard
My Bookings
Saved Services
Reviews
Profile
Logout
```

### Partner

```text
Dashboard
Services
Availability
Bookings
Profile
Logout
```

### Admin

```text
Dashboard
Users
Partner Applications
Services
Bookings
Logout
```

---

# 6. Home Page Design

The PRD recommends the following order:

```text
1. Navigation
2. Hero
3. Search / Discovery
4. Popular Experiences
5. Tourism Categories
6. How NarmadaSetu Works
7. Featured Local Partners
8. Community / Culture
9. Safety / Trust
10. Call to Action
11. Footer
```

## 6.1 Hero Section

Purpose:

Immediately communicate what NarmadaSetu does and give users a path into discovery.

Recommended structure:

```text
------------------------------------------------
|                                              |
| Explore the Narmada                          |
| Discover local experiences you can trust.    |
|                                              |
| [ Search experiences, locations...        ]  |
|                                              |
| [Explore Experiences]                        |
|                                              |
------------------------------------------------
```

The hero must remain concise.

Do not fill the hero with multiple competing CTAs.

## 6.2 Discovery Search

Search should support the PRD's discovery requirements.

Searchable concepts:

- Service name
- Location
- Category
- Provider

Filters:

- Category
- Location
- Price range
- Rating
- Availability

Sorting:

- Price: low to high
- Price: high to low
- Rating
- Recently added

---

# 7. Tourism Categories

Display the six initial categories:

1. Boat Ride
2. Homestay
3. Food
4. Local Guide
5. Narmada Aarti
6. Other Local Experiences

Recommended UI:

```text
[Boat Ride] [Homestay] [Food]
[Guide]     [Aarti]    [Other]
```

Category cards should use:

- Clear icon/image
- Category name
- Short supporting text where useful
- Large touch target

---

# 8. Service Card Design

Service cards are a core marketplace component.

Recommended hierarchy:

```text
┌───────────────────────────────┐
│                               │
│          Service Image        │
│                               │
├───────────────────────────────┤
│ Service Name             ★4.8 │
│ Category · Location           │
│                               │
│ Provider: Verified Partner    │
│                               │
│ From ₹XXXX                    │
│                               │
│ [View Details]                │
└───────────────────────────────┘
```

The exact price display must follow the service's actual pricing model.

Cards should make these fields easy to identify:

- Service name
- Category
- Location
- Provider
- Price
- Rating
- Review count
- Verification status
- Availability where useful

Avoid putting every service field on the card. Details belong on the service detail page.

---

# 9. Service Details Page

The service detail page is the primary decision screen before booking.

Recommended structure:

```text
Breadcrumb / Back
        ↓
Image Gallery
        ↓
Service Name
Category · Location
Rating · Review Count
Verification Status
        ↓
Provider Information
        ↓
Description
        ↓
Category-Specific Information
        ↓
Price
Availability
        ↓
Safety Information where applicable
        ↓
Booking Form
        ↓
Reviews
```

## 9.1 Image Gallery

Images should be:

- Optimized
- Responsive
- Clearly related to the service
- Provided with meaningful alt text

Do not use oversized images that unnecessarily slow the page.

## 9.2 Provider Information

The provider area should clearly identify the service provider and communicate verification where available.

Example:

```text
Provided by
[Provider Name]
✓ Verified Partner
```

## 9.3 Booking CTA

The primary booking action should be visually prominent.

Recommended label:

`Book Now`

Do not hide the primary booking action behind decorative interactions.

---

# 10. Booking UX

The booking flow defined by the PRD is:

```text
Discover Service
      ↓
Service Details
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
Tourist Sees Status
```

## 10.1 Booking Form

The form should be divided into logical groups.

```text
Date
[ Select date ]

Time
[ Select time ]

Booking information
[ Fields required by service ]

Notes
[ Optional notes ]

--------------------------------
Booking Summary
Service
Date
Time
Amount
--------------------------------

[Submit Booking]
```

## 10.2 Booking Review

Before submission, show:

- Service
- Provider
- Date
- Time
- Quantity where applicable
- Total amount
- Important service information

The user must be able to identify what they are booking before submitting.

## 10.3 Booking Confirmation

After creation, show:

- Booking ID
- Service
- Provider
- Date
- Time
- Amount
- Current booking status
- Payment status where applicable

---

# 11. Booking Status UI

Initial booking states:

- Pending
- Confirmed
- Rejected
- Cancelled
- Completed

Use both text and visual treatment.

Example:

```text
● Pending
● Confirmed
● Rejected
● Cancelled
● Completed
```

Never communicate status through color alone.

## Payment Status

Payment status is separate from booking status:

- Pending
- Paid
- Failed
- Refunded
- Not required

---

# 12. Tourist Dashboard

## 12.1 Dashboard Overview

Recommended hierarchy:

```text
Welcome / Profile
        ↓
Upcoming Bookings
        ↓
Recent Bookings
        ↓
Saved Services
        ↓
Review Reminders
```

Important information should be visible without making the user search through multiple screens.

## 12.2 My Bookings

Each booking row/card should show:

- Booking ID
- Service
- Provider
- Date
- Time
- Amount
- Booking status
- Payment status

Desktop:

```text
Booking | Service | Provider | Date | Amount | Status | Action
```

Mobile:

Use stacked booking cards rather than a wide table requiring horizontal scrolling.

## 12.3 Saved Services

Saved services should be presented using the same service-card language as discovery.

## 12.4 Profile

Profile information:

- Name
- Email
- Phone
- Profile image
- Account information

---

# 13. Partner Dashboard

## 13.1 Overview

Show:

```text
Total Services
Pending Bookings
Confirmed Bookings
Completed Bookings
Basic Earnings Summary
```

Use compact metric cards.

Example:

```text
┌──────────────┐ ┌──────────────┐
│ Total        │ │ Pending      │
│ Services     │ │ Bookings     │
│ 12           │ │ 4            │
└──────────────┘ └──────────────┘
```

Metrics should support quick scanning rather than visual decoration.

## 13.2 Service Management

Partners need to:

- Create service
- Edit service
- Update price
- Update availability
- Upload images
- Disable service

Recommended service-management layout:

```text
Services
                         [ + Add Service ]

------------------------------------------------
Service | Category | Price | Status | Actions
------------------------------------------------
```

On mobile, convert rows into cards.

## 13.3 Booking Management

Partners need to:

- View incoming bookings
- Accept bookings
- Reject bookings
- Mark bookings completed
- View booking details

Actions should be clearly associated with the relevant booking.

---

# 14. Partner Onboarding UX

Partner onboarding flow:

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

Use a step-based form for long onboarding.

Example:

```text
1 Profile  →  2 Service  →  3 Documents  →  4 Submit
```

Each step should:

- Have a clear title
- Explain what is required
- Preserve entered data
- Show validation errors near the relevant field
- Provide clear next/back actions

Partner verification states:

- Pending
- Approved
- Rejected
- Suspended

---

# 15. Admin Dashboard

The admin interface is operational rather than marketing-focused.

## 15.1 Main Areas

```text
Overview
Users
Partner Applications
Services
Bookings
```

## 15.2 Partner Verification

Admin should be able to:

- View pending applications
- Review submitted information
- Approve
- Reject
- Suspend

Use a review layout that keeps applicant information and the decision actions close together.

## 15.3 Service Moderation

Admin should be able to:

- View services
- Approve services where required
- Disable inappropriate services
- Remove fraudulent listings

Destructive actions must require clear confirmation.

## 15.4 Booking Monitoring

Provide:

- Search
- Filters
- Booking status
- Booking details

Do not overload the dashboard with every field by default.

---

# 16. Review and Rating UX

Reviews are available after eligible completed bookings.

Review requirements:

- Rating: 1–5
- Comment
- Booking reference

Recommended interaction:

```text
How was your experience?

☆ ☆ ☆ ☆ ☆

[ Tell us about your experience... ]

[Submit Review]
```

Rating should not rely only on color or icons; include accessible labels.

Admin moderation actions should be clear but not intrusive to normal users.

---

# 17. Forms

## 17.1 Form Structure

Every form should use:

```text
Label
Input
Helper text if required
Validation message
```

Avoid placeholder text as the only label.

## 17.2 Validation

Validation messages should:

- Explain what went wrong
- Identify the affected field
- Use plain language
- Appear close to the field
- Remain understandable for keyboard and assistive-technology users

Example:

`Please enter a valid phone number.`

Not:

`Invalid input.`

## 17.3 Required Fields

Clearly indicate required fields.

Do not make users guess which fields are mandatory.

---

# 18. Buttons and Actions

## Primary

Use for the main action on a screen.

Examples:

- Explore Experiences
- Book Now
- Submit Booking
- Add Service
- Approve

## Secondary

Use for supporting actions.

Examples:

- View Details
- Edit
- Back
- Cancel

## Destructive

Use for actions such as:

- Delete
- Disable
- Reject
- Remove

Destructive actions should not be visually confused with ordinary navigation.

---

# 19. Design Tokens

The exact visual brand palette is not specified by the PRD. Therefore, the implementation should define a restrained tourism-oriented token system without treating specific colors as PRD requirements.

## 19.1 Color Roles

Define semantic tokens:

```text
--color-primary
--color-primary-hover
--color-background
--color-surface
--color-text
--color-text-muted
--color-border
--color-success
--color-warning
--color-error
--color-info
```

Color must communicate hierarchy and state consistently.

## 19.2 Typography

Use a highly readable sans-serif typeface.

Suggested hierarchy:

```text
Display / Hero
H1
H2
H3
Body
Small / Caption
```

Typography should prioritize readability over decorative styling.

Recommended principles:

- Strong heading hierarchy
- Comfortable line height
- Short line lengths for long text
- Readable body text on mobile
- Avoid overly condensed type

## 19.3 Spacing

Use a consistent spacing scale.

Example:

```text
4
8
12
16
24
32
48
64
```

Do not introduce arbitrary spacing values without a reason.

## 19.4 Border Radius

Use a small, consistent radius system for:

- Cards
- Inputs
- Buttons
- Modals

Avoid excessive rounding that makes the interface visually noisy.

## 19.5 Elevation

Use subtle elevation only where it improves hierarchy.

Avoid heavy shadows and excessive glassmorphism.

---

# 20. Responsive Design

The platform must support:

- Mobile phones
- Tablets
- Laptops
- Desktop screens

## 20.1 Mobile

Priorities:

1. Content
2. Search/discovery
3. Primary action
4. Navigation
5. Secondary information

Use:

- Full-width primary buttons where appropriate
- Touch-friendly controls
- Stacked forms
- Card layouts
- Responsive images
- Compact navigation

## 20.2 Tablet

Use multi-column layouts where content remains readable.

Service grids may increase from one column to two or more depending on available width.

## 20.3 Desktop

Use:

- Wider content containers
- Multi-column service grids
- Persistent dashboard navigation where appropriate
- Side-by-side booking/detail layouts where useful

Never sacrifice readability simply to fill available screen width.

---

# 21. Accessibility

The frontend should follow practical accessibility principles from the PRD.

Required:

- Semantic HTML
- Keyboard-accessible controls
- Visible focus states
- Proper form labels
- Meaningful button text
- Image alt text
- Sufficient text/background contrast
- Understandable error messages

## 21.1 Keyboard

All interactive controls must be reachable and usable with a keyboard.

## 21.2 Focus

Never remove focus indicators without providing an equivalent visible focus state.

## 21.3 Images

Decorative images may use empty alt text when appropriate.

Meaningful service images must have useful alternative text.

## 21.4 Color

Do not communicate important information through color alone.

Example:

```text
✓ Confirmed
```

rather than relying only on a green badge.

---

# 22. Performance-Aware Design

The PRD requires a fast interface.

Design decisions should support:

- Fast initial page load
- Optimized images
- Lazy loading where useful
- Pagination for large datasets
- Efficient API responses
- Minimal unnecessary frontend requests

## Service Listing Performance

Never design the interface around loading an unbounded list of services.

Use:

- Pagination
- Incremental loading where appropriate
- Optimized images
- Clear loading states

---

# 23. Loading States

Every data-dependent screen should have a predictable loading state.

Examples:

### Service List

```text
[Image placeholder]
[Title placeholder]
[Metadata placeholder]
```

### Dashboard

Use lightweight skeletons for cards and lists where appropriate.

Avoid large spinners for every small operation.

---

# 24. Empty States

Empty states should explain what happened and what the user can do next.

Example:

```text
No upcoming bookings

You don't have any upcoming bookings yet.

[Explore Experiences]
```

Partner:

```text
No services yet

Create your first tourism service to start receiving bookings.

[Add Service]
```

Admin:

```text
No pending applications
```

---

# 25. Error States

Errors should be:

- Clear
- Short
- Actionable
- Non-technical

Example:

```text
We couldn't load these services.
Please try again.

[Try Again]
```

Avoid exposing:

- Stack traces
- Internal database errors
- Technical implementation details

---

# 26. Confirmation and Destructive Actions

Actions such as rejection, disabling, deletion, or cancellation should make the consequence clear.

Example:

```text
Disable this service?

Tourists will no longer be able to book this service.

[Cancel] [Disable Service]
```

The confirmation should identify the object being affected.

---

# 27. Safety and Trust UX

Safety is particularly important for boat-related tourism.

Where supported by service data, clearly present:

- Partner verification
- Boat capacity
- Safety information
- Boarding location
- Relevant emergency/contact information

Future capabilities such as SOS and live boat tracking are not MVP requirements and should not be represented as implemented functionality.

---

# 28. Category-Specific UX

## Boat Ride

Highlight:

- Boat name
- Boat type
- Passenger capacity
- Ride duration
- Boarding location
- Safety information
- Pricing
- Availability

## Homestay

Highlight:

- Property name
- Room type
- Guest capacity
- Amenities
- Check-in
- Check-out
- House rules

## Food

Highlight:

- Food type
- Menu
- Serving capacity
- Pickup/delivery information
- Available timings

## Local Guide

Prioritize:

- Provider information
- Service description
- Location
- Price
- Availability
- Ratings/reviews

## Narmada Aarti

Prioritize:

- Experience description
- Location
- Date/time
- Provider
- Availability
- Booking information

## Other Local Experiences

Use the common service layout and expose category-specific information when available.

---

# 29. Component System

Recommended reusable component groups:

```text
components/
├── common/
│   ├── Button
│   ├── Input
│   ├── Select
│   ├── Modal
│   ├── Badge
│   ├── Card
│   ├── EmptyState
│   ├── ErrorState
│   ├── LoadingState
│   └── Pagination
│
├── service/
│   ├── ServiceCard
│   ├── ServiceGrid
│   ├── ServiceFilters
│   ├── ServiceGallery
│   ├── ProviderSummary
│   └── RatingSummary
│
├── booking/
│   ├── BookingForm
│   ├── BookingSummary
│   ├── BookingCard
│   └── BookingStatus
│
└── dashboard/
    ├── MetricCard
    ├── DashboardHeader
    ├── DataTable
    └── Sidebar
```

Components should be reusable and should not contain unrelated business logic.

---

# 30. Screen Inventory

## Public Screens

- Home
- Explore/Search
- Service Details
- Login
- Registration

## Tourist Screens

- Dashboard
- My Bookings
- Booking Details
- Saved Services
- Reviews
- Profile

## Partner Screens

- Dashboard
- Partner Profile
- Partner Application
- Services
- Create Service
- Edit Service
- Availability
- Bookings
- Booking Details

## Admin Screens

- Dashboard
- Users
- Partner Applications
- Partner Application Details
- Services
- Bookings
- Booking Details

---

# 31. Design for Different Data States

Every important screen should account for:

```text
Loading
Success
Empty
Error
Unauthorized
Not Found
```

For example, a service detail screen should have a meaningful not-found state instead of a blank page.

---

# 32. UX Rules by Role

## Tourist

Optimize for:

```text
Discover → Understand → Compare → Book → Track → Review
```

## Partner

Optimize for:

```text
Onboard → Publish → Manage → Accept → Complete → Monitor
```

## Admin

Optimize for:

```text
Review → Verify → Moderate → Monitor → Manage
```

---

# 33. Design Anti-Patterns

Do not:

- Use excessive animations
- Hide important information behind unnecessary interactions
- Use tiny mobile controls
- Depend on color alone
- Use placeholder text as the only form label
- Create extremely long ungrouped forms
- Use large unpaginated service lists
- Put too many actions on one card
- Use technical error messages for end users
- Hide booking status
- Hide provider identity
- Hide pricing
- Make the primary CTA visually secondary

---

# 34. UX Acceptance Checklist

A feature should not be considered UI/UX complete until:

### Structure

- [ ] User purpose is clear.
- [ ] Information hierarchy is clear.
- [ ] Navigation is consistent.
- [ ] Primary action is obvious.

### Responsive

- [ ] Mobile layout works.
- [ ] Tablet layout works.
- [ ] Laptop layout works.
- [ ] Desktop layout works.
- [ ] No unnecessary horizontal scrolling exists.

### Accessibility

- [ ] Semantic HTML is used.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Forms have labels.
- [ ] Images have appropriate alt text.
- [ ] Contrast is sufficient.
- [ ] Status is not communicated by color alone.
- [ ] Errors are understandable.

### Performance

- [ ] Images are optimized.
- [ ] Large lists are paginated.
- [ ] Loading states exist.
- [ ] Empty states exist.
- [ ] Error states exist.
- [ ] Unnecessary requests are avoided.

### Product Rules

- [ ] Tourist booking flow matches the PRD.
- [ ] Partner onboarding matches the PRD.
- [ ] Partner verification state is clear.
- [ ] Service information matches the PRD.
- [ ] Booking and payment status are presented separately.
- [ ] Review eligibility is respected.
- [ ] Role-specific navigation is respected.

---

# 35. Design-to-Development Handoff

Each designed screen should provide enough information for implementation.

For every screen define:

```text
Screen purpose
User role
Layout
Components
Content hierarchy
Primary CTA
Secondary actions
States
Responsive behavior
Accessibility behavior
Validation/error behavior
```

For reusable components define:

```text
Component name
Purpose
Variants
States
Props/data
Interaction behavior
Accessibility requirements
Responsive behavior
```

---

# 36. Design File Organization

A UI/UX design file should be organized around:

```text
00 — Foundations
01 — Components
02 — Public Pages
03 — Authentication
04 — Tourist
05 — Partner
06 — Admin
07 — Responsive Views
08 — States & Errors
09 — Accessibility
10 — Prototype / User Flows
```

This structure keeps the design system separate from feature screens.

---

# 37. Core User Flows

## Tourist Discovery

```text
Home
  ↓
Search / Category
  ↓
Results
  ↓
Filters / Sort
  ↓
Service Details
```

## Tourist Booking

```text
Service Details
  ↓
Date / Time
  ↓
Booking Information
  ↓
Review
  ↓
Submit
  ↓
Booking Status
```

## Partner Onboarding

```text
Register
  ↓
Profile
  ↓
Service Information
  ↓
Documents
  ↓
Submit
  ↓
Pending Review
  ↓
Approved / Rejected
```

## Partner Booking Management

```text
Partner Dashboard
  ↓
Incoming Booking
  ↓
Booking Details
  ↓
Accept / Reject
  ↓
Completed
```

## Admin Verification

```text
Admin Dashboard
  ↓
Partner Applications
  ↓
Application Details
  ↓
Review Information
  ↓
Approve / Reject / Suspend
```

---

# 38. MVP Design Boundary

The UI/UX MVP should focus on:

- User registration and login
- Role-based interfaces
- Tourist profile
- Partner registration
- Partner verification
- Service listing
- Service details
- Search and filtering
- Booking creation
- Booking status
- Tourist booking history
- Partner booking management
- Basic reviews and ratings
- Admin dashboard
- Responsive web interface

The following are post-MVP and should not be represented as required MVP functionality:

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

---

# 39. Final Design Standard

NarmadaSetu should feel:

```text
Local
        +
Trustworthy
        +
Simple
        +
Professional
        +
Accessible
        +
Fast
```

The visual design should support the product rather than compete with it.

The most important design outcome is a clear path from:

```text
Discover
   ↓
Understand
   ↓
Trust
   ↓
Book
   ↓
Track
   ↓
Review
```

All future UI decisions should remain consistent with the PRD, the application architecture, the three user roles, responsive requirements, accessibility requirements, and MVP boundaries.
