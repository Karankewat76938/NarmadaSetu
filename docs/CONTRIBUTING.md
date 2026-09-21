# NarmadaSetu — Contribution Guidelines

**Basis:** PRD.md Section 38 & 39

---

## 1. Branching Strategy

- `main`: Production-ready release branch
- `develop`: Integration branch for tested features
- `feature/*`: Specific feature branches (e.g. `feature/boat-availability`, `feature/tourist-reviews`)
- `fix/*`: Bug fix branches (e.g. `fix/price-calculation`)

---

## 2. Commit Message Conventions

Commits must follow the Conventional Commits format:

- `feat: <description>` — New user-facing feature or API capability
- `fix: <description>` — Bug fix
- `refactor: <description>` — Architectural or code organization improvement
- `docs: <description>` — Documentation update
- `test: <description>` — Adding or updating test suites

---

## 3. Definition of Done (PRD Section 39)

A feature is considered complete only when:

1. Frontend UI is fully responsive across desktop, tablet, and mobile.
2. Backend API routes and services implement all validation and authorization checks.
3. Server-side price calculation and availability logic are verified.
4. Centralized error handling returns structured JSON errors without sensitive stack traces.
5. No hardcoded credentials or `.env` files are committed.
6. Automated test suites pass.
