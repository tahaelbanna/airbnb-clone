<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Airbnb Clone API with NestJS, MongoDB, JWT, File Uploads, Bookings, OTP, and Clean Architecture

A production-style backend for an Airbnb-inspired rental and booking platform built with **NestJS, TypeScript, MongoDB, JWT, and Docker**.

This project implements a complete backend architecture for a rental marketplace, including authentication, users, system administration, listings, bookings, reviews, favorites, file uploads, OTP verification, email integration, validation, authorization, Swagger documentation, and local infrastructure.

The project focuses not only on building CRUD APIs, but also on applying clean and maintainable backend architecture, separation of concerns, reusable components, business rules, and real-world API development practices.

---

## Overview

The application provides a backend for a rental marketplace where different types of users interact with the platform.

### Guests

Guests can:

- Register and log in
- Browse available rental units
- View unit details
- Check unit availability
- Create booking requests
- Update and cancel bookings
- Submit reviews
- Manage favorite units

### Hosts

Hosts can:

- Create and manage their rental units
- Upload and manage unit photos
- Activate and deactivate listings
- Respond to booking requests
- View reviews for their units

### System Admins

System admins can manage platform-level reference data such as:

- Countries
- Cities
- Currencies
- Unit categories
- Application settings

The application also includes JWT authentication, refresh tokens, role-based authorization, validation, file uploads, MongoDB persistence, email delivery, OTP verification, and Swagger API documentation.

---

## Main Features

- Authentication with register, login, refresh token, and current account endpoints
- Role-based access control for users and system admins
- System admin initialization from environment variables
- User management with secure password hashing
- Countries, cities, currencies, unit categories, and app settings modules
- Unit/listing management with owner authorization
- Unit photo upload, update, and delete flows
- File validation by size, extension, and file signature
- S3-compatible storage support with local MinIO
- Public unit listing and unit details APIs
- User-owned unit listing APIs
- Unit activation, deactivation, and soft delete flows
- Booking availability checks
- Booking request creation and price calculation
- Guest booking update and cancellation flows
- Host booking status management
- Booking review submission
- Unit review aggregation and listing
- Favorite units APIs
- OTP generation, sending, storage, and verification
- Mail module using an adapter pattern with Nodemailer
- Forgot-password flow using OTP and email
- MongoDB repositories with a reusable base repository
- Use-case based application structure
- DTO validation and response transformation
- Global exception handling
- Internationalized validation messages with `nestjs-i18n`
- Swagger API documentation
- Docker Compose infrastructure for MongoDB, MinIO, and Mailpit
- API collection for testing the main application flows

---

## Architecture

The project follows a modular NestJS architecture with clear separation of responsibilities.

### Core Layers

```text
controller
    ↓
service
    ↓
usecases
    ↓
repository
    ↓
database
```

### Responsibilities

- **Controller**: Receives HTTP requests and delegates operations.
- **Service**: Coordinates application-level operations.
- **Use Cases**: Contains focused business actions and application logic.
- **Repository**: Handles persistence and database operations.
- **Schema**: Defines MongoDB documents using Mongoose.
- **DTO**: Validates incoming data and shapes request/response objects.
- **Swagger**: Documents the API endpoints.

This structure keeps controllers thin, separates business logic from persistence, and makes the codebase easier to extend and maintain.

---

## Project Modules

```text
src
├── app-settings
├── auth
├── bookings
├── cities
├── common
├── countries
├── currencies
├── files-upload
├── i18n
├── mail
├── otp
├── system-admins
├── unit-categories
├── unit-favorites
├── unit-reviews
├── units
└── users
```

### Important Modules

- `auth`: Authentication, JWT, refresh tokens, guards, and decorators
- `users`: User management and password handling
- `units`: Rental unit creation, management, ownership, and lifecycle
- `bookings`: Availability, booking requests, price calculation, and status management
- `unit-favorites`: User favorite units
- `unit-reviews`: Unit reviews and rating aggregation
- `files-upload`: File upload abstraction and storage operations
- `mail`: Email adapter abstraction and Nodemailer integration
- `otp`: OTP generation, storage, sending, and verification
- `system-admins`: System administrator management
- `common`: Shared repositories, exceptions, interceptors, configuration, Swagger, files, and utilities

---

## Business Relationships

The main features of the application are connected through real business rules.

### Authentication

Authentication is connected to:

- JWT access tokens
- Refresh tokens
- Guards
- Roles
- Current-user decorators
- Protected routes

### Units

Units are connected to:

- Owners
- Unit categories
- Currencies
- Photos
- Bookings
- Reviews
- Favorites

### Bookings

Bookings include:

- Availability validation
- Price calculation
- Guest actions
- Host actions
- Booking status management
- Review flows

### OTP & Email

The OTP and mail modules provide reusable infrastructure for account-related flows such as:

- OTP verification
- Email delivery
- Forgot password

---

## Tech Stack

- **NestJS 11**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcryptjs**
- **class-validator**
- **class-transformer**
- **Joi**
- **Swagger / OpenAPI**
- **nestjs-i18n**
- **AWS SDK S3**
- **MinIO**
- **Nodemailer**
- **Mailpit**
- **Docker Compose**
- **Jest**
- **ESLint**
- **Prettier**
- **pnpm**

---

## Authentication & Authorization

The authentication system uses JWT-based authentication with access and refresh tokens.

The project also implements role-based authorization to protect endpoints according to the user's role.

The authorization system includes:

- JWT authentication
- Access tokens
- Refresh tokens
- Guards
- Role-based authorization
- Public routes
- Current-user decorators
- Ownership checks

Passwords are securely hashed using `bcryptjs`.

---

## File Uploads

The application includes a complete file-upload flow for rental unit photos.

The upload system supports:

- File size validation
- File extension validation
- File signature validation
- S3-compatible storage
- Local MinIO development environment
- Upload
- Update
- Delete

The storage layer is abstracted so that the application is not tightly coupled to a specific storage provider.

---

## Bookings

The booking system contains business logic beyond basic CRUD operations.

It supports:

- Availability checks
- Booking requests
- Booking price calculation
- Guest booking updates
- Guest cancellation
- Host booking status management
- Booking reviews

This allows the API to model the actual interaction between guests, hosts, and rental units.

---

## Reviews & Ratings

Users can submit reviews for units after the appropriate booking flow.

The review system supports:

- Review creation
- Review listing
- Unit rating aggregation
- Rating updates

---

## OTP & Email

The project contains reusable OTP and email modules.

### OTP

The OTP module handles:

- OTP generation
- OTP storage
- OTP sending
- OTP verification

### Mail

The mail module uses an adapter-based design with Nodemailer support.

This makes the email functionality easier to extend or replace without changing the business logic that depends on it.

---

## Validation & Error Handling

The API uses DTO-based validation for:

- Request bodies
- Route parameters
- Query parameters
- Uploaded files

The application also includes:

- Global exception handling
- Response transformation
- Internationalized validation messages using `nestjs-i18n`

---

## Swagger Documentation

The API is documented using **Swagger / OpenAPI**.

After running the application, the Swagger documentation is available at:

```text
http://localhost:3000/api/docs
```

Swagger provides an interactive interface for exploring and testing the available API endpoints.

---

## Docker Infrastructure

The project uses Docker Compose for local development infrastructure.

The local environment includes:

- MongoDB
- MinIO
- Mailpit

### Services

```text
MongoDB
localhost:27017

MinIO API
localhost:9000

MinIO Console
localhost:9001

Mailpit SMTP
localhost:1025

Mailpit Inbox
localhost:8025
```

---

## Local Development

### Requirements

Make sure the following are installed:

- Node.js
- pnpm
- Docker
- Docker Compose

### Installation

```bash
pnpm install
```


### Start Infrastructure

```bash
pnpm run docker:up
```

Initialize the local MongoDB replica set:

```bash
pnpm run docker:rs:init:local
```

### Start the API

Development mode:

```bash
pnpm run start:dev
```


The API runs by default on:

```text
http://localhost:3000
```


## Testing

The project uses **Jest** for testing.

Available testing commands include:

```bash
pnpm run test
pnpm run test:e2e
pnpm run test:cov
```

