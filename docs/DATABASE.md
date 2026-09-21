# NarmadaSetu — Database Architecture & Schemas

**Engine:** MongoDB  
**ODM:** Mongoose  
**Design Basis:** PRD.md Section 26 & ARCHITECTURE.md Section 8

---

## 1. Collections & Data Models

### 1.1 User (`users`)

Stores platform actors with 3 distinct roles: `tourist`, `partner`, `admin`.

| Field           | Type     | Attributes                              | Description             |
| --------------- | -------- | --------------------------------------- | ----------------------- |
| `_id`           | ObjectId | Primary Key                             | Unique user identifier  |
| `name`          | String   | Required, trim                          | Full display name       |
| `email`         | String   | Required, unique, indexed               | Account login email     |
| `phone`         | String   | Optional                                | Contact mobile number   |
| `passwordHash`  | String   | Required, select: false                 | bcrypt-hashed password  |
| `role`          | String   | Enum: `tourist`, `partner`, `admin`     | User authorization role |
| `profileImage`  | String   | Optional                                | URL to avatar image     |
| `accountStatus` | String   | Enum: `active`, `inactive`, `suspended` | Account lifecycle state |
| `createdAt`     | Date     | Timestamp                               | Account creation date   |
| `updatedAt`     | Date     | Timestamp                               | Last update date        |

---

### 1.2 Service (`services`)

Represents tourism offerings with category-specific polymorphic sub-documents.

| Field                | Type     | Attributes                                                                     | Description                                                 |
| -------------------- | -------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `_id`                | ObjectId | Primary Key                                                                    | Service identifier                                          |
| `provider`           | ObjectId | Ref: `User`, Required                                                          | Partner managing this listing                               |
| `category`           | String   | Enum: `boat_ride`, `homestay`, `food`, `local_guide`, `narmada_aarti`, `other` | Service classification                                      |
| `title`              | String   | Required, text indexed                                                         | Listing title                                               |
| `description`        | String   | Required, text indexed                                                         | Full experience overview                                    |
| `price`              | Number   | Required, min: 0, indexed                                                      | Base numerical price                                        |
| `pricingUnit`        | String   | Enum: `per_person`, `per_ride`, `per_night`, `per_meal`, `per_group`           | Price charging model                                        |
| `location`           | Object   | `{ name, ghat, city, coordinates }`                                            | Geographic and river coordinates                            |
| `images`             | [String] | Array of URLs                                                                  | High-resolution photos                                      |
| `availability`       | Object   | `{ days, timeSlots, isAvailable }`                                             | Weekly operating slots                                      |
| `status`             | String   | Enum: `active`, `inactive`, `draft`                                            | Listing visibility state                                    |
| `verificationStatus` | String   | Enum: `pending`, `approved`, `rejected`                                        | Admin moderation status                                     |
| `categoryDetails`    | Object   | Category specific                                                              | Boat specs, homestay amenities, thali menu, guide languages |
| `rating`             | Number   | Default: 5.0                                                                   | Aggregate average rating                                    |
| `reviewCount`        | Number   | Default: 0                                                                     | Number of verified reviews                                  |

---

### 1.3 Booking (`bookings`)

Records commercial transactions with separated booking and payment states.

| Field                | Type     | Attributes                                                         | Description                        |
| -------------------- | -------- | ------------------------------------------------------------------ | ---------------------------------- |
| `_id`                | ObjectId | Primary Key                                                        | Reservation identifier             |
| `tourist`            | ObjectId | Ref: `User`, Required                                              | Traveler making booking            |
| `service`            | ObjectId | Ref: `Service`, Required                                           | Service being booked               |
| `provider`           | ObjectId | Ref: `User`, Required                                              | Partner delivering service         |
| `bookingDate`        | Date     | Required                                                           | Scheduled service date             |
| `bookingTimeSlot`    | String   | Required                                                           | Slot time window                   |
| `quantity`           | Number   | Required, min: 1                                                   | Passenger / guest / portions count |
| `unitPrice`          | Number   | Required (server calculated)                                       | Unit rate at booking time          |
| `totalAmount`        | Number   | Required (server calculated)                                       | Final calculated total             |
| `bookingStatus`      | String   | Enum: `pending`, `confirmed`, `rejected`, `cancelled`, `completed` | Operational status                 |
| `paymentStatus`      | String   | Enum: `pending`, `paid`, `failed`, `refunded`, `not_required`      | Separate payment state             |
| `notes`              | String   | Optional                                                           | Special tourist requests           |
| `cancelledBy`        | ObjectId | Ref: `User`, Optional                                              | Actor initiating cancellation      |
| `cancellationReason` | String   | Optional                                                           | Reason text                        |

---

### 1.4 Review (`reviews`)

Verified peer reviews strictly linked to completed bookings.

| Field     | Type     | Attributes                             | Description                 |
| --------- | -------- | -------------------------------------- | --------------------------- |
| `_id`     | ObjectId | Primary Key                            | Review identifier           |
| `tourist` | ObjectId | Ref: `User`, Required                  | Review author               |
| `service` | ObjectId | Ref: `Service`, Required               | Reviewed service            |
| `booking` | ObjectId | Ref: `Booking`, Unique                 | Completed booking reference |
| `rating`  | Number   | Required, 1 to 5                       | Star score                  |
| `comment` | String   | Required, trim                         | Review text                 |
| `status`  | String   | Enum: `published`, `flagged`, `hidden` | Moderation state            |

---

### 1.5 PartnerApplication (`partnerapplications`)

Onboarding credential submissions for operator verification.

| Field               | Type     | Attributes                                           | Description                 |
| ------------------- | -------- | ---------------------------------------------------- | --------------------------- |
| `_id`               | ObjectId | Primary Key                                          | Application identifier      |
| `user`              | ObjectId | Ref: `User`, Unique                                  | Partner user reference      |
| `serviceCategory`   | String   | Enum of categories                                   | Primary category            |
| `businessName`      | String   | Required                                             | Business/boat association   |
| `experienceYears`   | Number   | Required                                             | Years operating on river    |
| `contactDetails`    | Object   | `{ phone, address, ghatOrCity }`                     | Operating location          |
| `documents`         | Object   | `{ idProofType, idProofNumber, licenseNumber }`      | Official credentials        |
| `applicationStatus` | String   | Enum: `pending`, `approved`, `rejected`, `suspended` | Verification state          |
| `reviewedBy`        | ObjectId | Ref: `User`                                          | Admin reviewer              |
| `reviewedAt`        | Date     | Timestamp                                            | Review date                 |
| `rejectionReason`   | String   | Optional                                             | Admin feedback on rejection |
