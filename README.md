<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# ESQOUN - اِسْكُنْ

**A Full-Stack MVP Web App inspired by Airbnb, with its own visual identity.**

ESQOUN is a full-stack accommodation platform where users can discover and explore stays, browse listings by category, view detailed units, manage favorites, check availability, and make bookings.

The platform also provides dedicated flows for hosts and system administrators to manage listings, bookings, and platform data.

The project focuses not only on building functional features, but also on applying modular backend architecture, separation of concerns, reusable abstractions, and real-world engineering practices.

---

## Overview

ESQOUN is built around three main user roles:

### Guests

Guests can:

* Register and authenticate
* Browse available accommodation units
* Browse units by category
* View detailed unit information
* Check availability
* Create and manage bookings
* Cancel bookings
* Manage favorite units
* Submit reviews

### Hosts

Hosts can:

* Create and manage accommodation units
* Upload and manage unit photos
* Activate and deactivate listings
* Manage booking requests
* View bookings for their units
* View reviews for their listings

### System Admins

System administrators can manage platform-level data such as:

* Countries
* Cities
* Currencies
* Unit categories
* Application settings
* Users and administrative resources

---

# Features

## Authentication & Authorization

* User registration and login
* JWT-based authentication
* Access and refresh tokens
* HTTPOnly cookies
* Role-based access control (RBAC)
* Authentication Guards
* Ownership checks
* Protected and public routes
* Secure password hashing with `bcryptjs`
* Current-user handling
* OTP verification
* Forgot-password flow

## Accommodation Units

* Create and manage rental units
* Unit ownership
* Unit categories
* Unit activation and deactivation
* Soft deletion
* Unit details
* Public unit discovery
* Category-based browsing
* Unit photo management
* Availability checking

## Bookings

* Booking creation
* Availability validation
* Booking price calculation
* Guest booking management
* Guest cancellation
* Host booking management
* Booking status management
* Booking-related review flows

## Favorites

* Add units to favorites
* Remove units from favorites
* Retrieve user favorites

## Reviews

* Submit reviews
* Update reviews
* Retrieve unit reviews
* Rating aggregation

## File Uploads

* Multipart file uploads using Multer
* File size validation
* File extension validation
* File signature validation
* Multiple file uploads
* File deletion
* Storage provider abstraction
* Cloudinary integration

## Email & OTP

* OTP generation
* OTP storage
* OTP verification
* Email delivery
* Forgot-password emails
* Provider abstraction for email services
* Brevo HTTP API integration

## API & Validation

* RESTful APIs
* Swagger / OpenAPI documentation
* DTO validation
* Request transformation
* Standardized API responses
* Global exception handling
* Internationalized validation messages
* CORS configuration
* Rate limiting

---

# Architecture

The backend follows a modular layered architecture where each layer has a focused responsibility.

```text
                           HTTP Request
                                │
                                ▼
                         ┌─────────────┐
                         │  Middleware │
                         └──────┬──────┘
                                │
                                ▼
                         ┌─────────────┐
                         │    Guards   │
                         └──────┬──────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Interceptors │
                       └────────┬────────┘
                                │
                                ▼
                         ┌─────────────┐
                         │    Pipes    │
                         └──────┬──────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Controller   │
                       └────────┬────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │     Service    │
                       │  Orchestration │
                       └────────┬────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │    Use Case    │
                       │  Business Logic│
                       └────────┬────────┘
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
                 ▼                             ▼
        ┌─────────────────┐           ┌─────────────────┐
        │    Repository   │           │     Adapter     │
        │   Data Access   │           │  Infrastructure │
        └────────┬────────┘           └────────┬────────┘
                 │                             │
                 ▼                       ┌─────┴─────┐
        ┌─────────────────┐              │           │
        │ Mongoose / DB   │         ┌────▼────┐ ┌────▼──────┐
        │    MongoDB      │         │  Brevo  │ │ Cloudinary│
        └─────────────────┘         └─────────┘ └───────────┘
```

### Request Lifecycle

The main request flow is:

```text
Middleware
    ↓
Guards
    ↓
Interceptors
    ↓
Pipes
    ↓
Controller
    ↓
Service
    ↓
Use Case
    ↓
Repository / Adapter
    ↓
Database / External Provider
```

Exception handling operates across the request lifecycle rather than being treated as a normal step in the request chain.

---

# Architectural Responsibilities

### Middleware

Handles cross-cutting request-level concerns before requests reach the application layer.

### Guards

Responsible for authentication, authorization, role checks, and protected route access.

### Interceptors

Handle cross-cutting concerns such as response transformation and request/response processing.

### Pipes

Validate and transform incoming request data before it reaches the controller.

### Controllers

Receive HTTP requests, validate the route-level contract, and delegate operations to the application layer.

Controllers are intentionally kept thin.

### Services

Coordinate application-level operations and act as the orchestration layer between controllers and use cases.

### Use Cases

Contain focused application and business operations.

Each use case represents a specific action rather than placing large amounts of business logic inside controllers or repositories.

### Repositories

Abstract persistence and database access from the application logic.

This allows business logic to work with repository contracts instead of depending directly on database implementation details.

### Adapters

Abstract external infrastructure and third-party providers.

Examples include:

* Email providers
* File storage providers
* Other external services

This makes infrastructure easier to replace without changing the core business logic.

---

# Design Patterns & Principles

The project applies several architectural patterns and principles:

### Repository Pattern

Separates data access from business logic and prevents use cases from depending directly on MongoDB implementation details.

```text
Use Case
    ↓
Repository Interface
    ↓
MongoDB Repository
    ↓
Mongoose
```

### Use Case Pattern

Business operations are organized into focused use cases.

```text
Controller
    ↓
Service
    ↓
Use Case
```

This keeps business operations explicit and easier to maintain.

### Adapter Pattern

External providers are abstracted behind application-defined interfaces.

```text
Application
     ↓
 Adapter Interface
     ↓
Concrete Adapter
     ↓
External Provider
```

For example, email delivery can be changed without modifying the business logic that sends emails.

### Separation of Concerns

The project separates:

* HTTP concerns
* Authentication and authorization
* Application orchestration
* Business logic
* Data access
* External infrastructure

This keeps the system modular and easier to extend.

---

### Important Modules

| Module           | Responsibility                                                                |
| ---------------- | ----------------------------------------------------------------------------- |
| `auth`           | Authentication, JWT, guards, roles, decorators                                |
| `users`          | User management and password handling                                         |
| `units`          | Accommodation creation, ownership, lifecycle, and discovery                   |
| `bookings`       | Availability, booking creation, pricing, and status management                |
| `unit-favorites` | Favorite unit management                                                      |
| `unit-reviews`   | Reviews and rating aggregation                                                |
| `files-upload`   | File upload and storage abstraction                                           |
| `mail`           | Email provider abstraction and delivery                                       |
| `otp`            | OTP generation, storage, sending, and verification                            |
| `system-admins`  | System administrator functionality                                            |
| `common`         | Shared infrastructure, exceptions, interceptors, configuration, and utilities |

---

# Backend

The backend is built with NestJS and TypeScript and follows a modular architecture designed around separation of responsibilities.

### Backend Stack

* **NestJS 11**
* **TypeScript**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcryptjs**
* **class-validator**
* **class-transformer**
* **Joi**
* **Swagger / OpenAPI**
* **nestjs-i18n**
* **Multer**
* **Docker Compose**
* **Jest**
* **ESLint**
* **Prettier**
* **pnpm**

---

# Frontend

The frontend is built with Next.js and TypeScript.

### Frontend Stack

* **Next.js**
* **TypeScript**
* **React Query**
* **Zustand**
* **Tailwind CSS**
* **Axios**
* Responsive UI
* App Router
* Protected and guest routes

The frontend follows the **ESQOUN Modern Oasis** visual direction and provides responsive interfaces across desktop and mobile layouts.

### Frontend Features

* Authentication flows
* Accommodation discovery
* Category browsing
* Search
* Unit details
* Availability
* Favorites
* Booking flows
* Host listings
* Host booking management
* Admin dashboard
* Responsive layouts
* Loading and error states

---

# Authentication & Security

Authentication uses JWT-based access and refresh tokens.

The system includes:

```text
Authentication
      │
      ├── JWT Access Token
      ├── Refresh Token
      ├── HTTPOnly Cookies
      ├── Authentication Guards
      ├── Role-Based Access Control
      └── Ownership Checks
```

Security-related features include:

* Password hashing
* JWT authentication
* HTTPOnly cookies
* Role-based authorization
* Route protection
* Ownership validation
* DTO validation
* Rate limiting
* CORS configuration

---

# File Storage

File storage is abstracted behind a storage provider layer.

The application originally supported S3-compatible storage for local development, while the current production implementation uses Cloudinary.

```text
Files Upload Service
        ↓
Upload Use Case
        ↓
Storage Provider
        ↓
Cloudinary
```

This abstraction allows the storage provider to be replaced without changing the core business logic.

---

# Email Architecture

Email delivery is also abstracted behind an adapter interface.

```text
Business Logic
      ↓
Email Adapter
      ↓
Brevo API
```

The project initially used a Nodemailer/SMTP-based implementation and later migrated to the Brevo HTTP API.

The migration was possible without changing the business logic because email delivery is separated behind an adapter abstraction.

---

# OTP Flow

OTP functionality is used for account-related flows such as verification and password recovery.

```text
User
  ↓
Request OTP
  ↓
OTP Generation
  ↓
OTP Storage
  ↓
Email Provider
  ↓
User Receives OTP
  ↓
OTP Verification
  ↓
Protected Operation
```

---

# Booking Flow

The booking system contains business rules beyond basic CRUD operations.

```text
Guest
  ↓
Select Unit
  ↓
Check Availability
  ↓
Calculate Price
  ↓
Create Booking
  ↓
Host Reviews Request
  ↓
Booking Status
  ↓
Completed Stay
  ↓
Review
```

The backend validates booking rules before allowing state changes.

---

# Validation & Error Handling

The API uses DTO-based validation for:

* Request bodies
* Route parameters
* Query parameters
* Uploaded files

The application also provides:

* Global exception handling
* Standardized API responses
* Response transformation
* Internationalized validation messages
* Consistent error handling

This keeps API responses predictable across different modules.

---

# API Documentation

The backend exposes its REST APIs through Swagger / OpenAPI documentation.

For local development, Swagger is available through the configured API documentation route.

Swagger provides an interactive interface for:

* Exploring endpoints
* Inspecting request schemas
* Inspecting response schemas
* Testing API operations
* Understanding authentication requirements

---

# Docker

Docker Compose is used to simplify local infrastructure setup.

The development environment can provide supporting services such as:

* MongoDB
* Local storage infrastructure
* Local email testing infrastructure

The exact services depend on the current Docker Compose configuration.


# Deployment

The production architecture uses separate services for different responsibilities.

```text
                         ESQOUN
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
        Next.js Frontend          NestJS Backend
             Vercel                  Railway
                                        │
                         ┌──────────────┼──────────────┐
                         │              │              │
                         ▼              ▼              ▼
                    MongoDB Atlas   Cloudinary      Brevo
                      Database       Storage         Email
```

### Production Infrastructure

* **Frontend:** Next.js deployed on Vercel
* **Backend:** NestJS deployed on Railway
* **Database:** MongoDB Atlas
* **File Storage:** Cloudinary
* **Email Delivery:** Brevo

---

# Engineering Focus

The main goal of ESQOUN was not simply to build an Airbnb-inspired application.

The project was also an opportunity to practice building a backend that can evolve without tightly coupling business logic to infrastructure.

The architecture separates:

```text
HTTP Layer
    ↓
Application Layer
    ↓
Business Logic
    ↓
Data Access
    ↓
Infrastructure
```

External services such as email and file storage are hidden behind abstractions, while database access is separated through repositories.

This makes the application easier to maintain, test, and extend.

---

# Project Links

* **GitHub:** [[GITHUB_URL]](https://github.com/tahaelbanna/esqoun-app)
* **Live Demo:** [[LIVE_URL]](https://esqoun.vercel.app)
* **API Documentation:** [[SWAGGER_URL]](https://esqoun.up.railway.app/api/docs#)

---

# Project Status

ESQOUN is an MVP project built as a full-stack accommodation platform with a production-oriented backend architecture and a responsive frontend experience.

The project is continuously refined as part of my backend and full-stack engineering journey.
