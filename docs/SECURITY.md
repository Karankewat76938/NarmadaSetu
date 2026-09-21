# NarmadaSetu — Security & Production Architecture

**Basis:** PRD.md Section 29 & ARCHITECTURE.md Section 11

---

## 1. Authentication & Session Security

- **Password Protection:** All user passwords are encrypted using `bcryptjs` with 10 salt rounds prior to persistence. Raw passwords and password hashes are excluded by default (`select: false`).
- **Signed Tokens:** JSON Web Tokens (JWT) are signed with a cryptographically secure HMAC secret and set with explicit expiration windows.
- **Admin Isolation:** Public registration endpoints strictly forbid creating administrator accounts. Any payload requesting an admin role is sanitized to 'tourist'. Admin accounts are only provisioned via controlled administrative utilities or secure seeding.

---

## 2. Role-Based Access Control (RBAC)

Operations enforce 3 layers of verification:

1. **User Identity:** Authenticated JWT check (`protect` middleware).
2. **Role Authorization:** Route permission match (`restrictTo('partner', 'admin')`).
3. **Resource Ownership:** Providers can only modify listings and bookings that belong to them; tourists can only inspect or cancel their own bookings.

---

## 3. Financial & Booking Integrity

- **Client Distrust:** Final pricing is NEVER trusted from client payloads. The backend fetches the authoritative service unit price from the database, computes `unitPrice * quantity`, and saves the total.
- **Availability Enforcement:** Availability, future date validity, and boat passenger limits are validated server-side.
- **State Separation:** Booking operational state (`pending`, `confirmed`, `completed`) and payment state (`pending`, `paid`) are decoupled to prevent payment ambiguities from breaking reservation tracking.

---

## 4. API Hardening

- **Helmet:** HTTP response headers secured with Helmet middleware.
- **CORS:** Configured with origin constraints.
- **Centralized Error Handling:** Production instances suppress raw database stack traces and internal exceptions, returning standardized JSON error codes.
