# ⚡ OneAI – Backend

<p align="center">
  <strong>The Backend Powering a Unified AI Experience</strong>
  <br/>
  A scalable, modular backend built with NestJS, Fastify, Prisma and PostgreSQL.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/NestJS-Framework-E0234E?logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-Language-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-Deployed-46E3B7?logo=render&logoColor=black" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Architecture-Modular%20%26%20Layered-blueviolet" />
  <img src="https://img.shields.io/badge/Authentication-JWT%20%2B%20Firebase-orange" />
  <img src="https://img.shields.io/badge/Status-Active%20Development-success" />
</p>

---

## 📌 Overview

**OneAI** is an AI-powered application designed to bring multiple AI models and capabilities together under one unified platform.

This repository contains the backend service responsible for authentication, user management, application business logic, database operations, and future AI orchestration.

Built using **NestJS**, the backend follows a modular and layered architecture designed for maintainability, scalability, and extensibility.

### 🎯 Project Vision

- 🤖 Unified access to multiple AI providers.
- 🔐 Secure authentication and authorization.
- 💬 Intelligent conversations and chat management.
- 📁 Project-based organization and file management.
- ⚡ Scalable infrastructure for AI-powered workflows.

> **Current Status:** Backend foundation, authentication, database integration, and initial deployment are implemented. Additional application and AI modules are under development.

---

## 🛠️ Technology Stack

### Core Technologies

| Category | Technology |
|---|---|
| 🟢 Runtime | Node.js |
| 🚀 Framework | NestJS |
| ⚡ HTTP Server | Fastify |
| 💻 Language | TypeScript |
| 🗄️ ORM | Prisma |
| 🐘 Database | PostgreSQL (Supabase) |
| 🔐 Authentication | Firebase Authentication |
| 🔑 Authorization | JWT |
| 🔒 Password Hashing | bcrypt |
| 🧪 Testing | Jest |
| ☁️ Hosting | Render |

### 🔮 Planned Production Technologies

| Category | Technology |
|---|---|
| 📦 File Storage | Amazon S3 |
| ⚡ Caching | Redis |
| 🔄 Background Jobs | BullMQ |
| 🤖 AI Providers | OpenAI, Gemini, Claude |
| 🌊 Streaming | Server-Sent Events (SSE) |
| 📊 Monitoring | Sentry + AWS CloudWatch |

---

## 🏗️ System Architecture

OneAI follows a client-server architecture where the Flutter application communicates exclusively with the NestJS backend.

### Backend Architecture

```text
                 📱 Flutter Application
                          |
                          | HTTPS / REST
                          |
                          ▼
                  ⚡ Fastify HTTP Server
                          |
                          ▼
                     NestJS Modules
                          |
             ┌────────────┼────────────┐
             |            |            |
             ▼            ▼            ▼
        Controllers    Services    Authentication
             |            |
             └─────┬──────┘
                   |
                   ▼
               Prisma ORM
                   |
                   ▼
          Supabase PostgreSQL
```

### 🧩 Architectural Layers

- **Controllers:** Handle incoming HTTP requests and API responses.
- **Services:** Contain application business logic.
- **Repository / Data Access:** Manage database interactions through Prisma.
- **Database:** PostgreSQL hosted on Supabase.

---

## ✨ Implemented Features

### 🔐 Authentication & Authorization

- [✔︎] Manual user registration.
- [✔︎] Manual user login.
- [✔︎] Password hashing using bcrypt.
- [✔︎] Google authentication through Firebase.
- [✔︎] Firebase ID token verification.
- [✔︎] OneAI JWT generation.
- [✔︎] JWT-based protected routes.
- [✔︎] Authenticated user profile retrieval.
- [✔︎] Apple authentication backend implementation (provider configuration and end-to-end availability pending).

### 👤 User Management

- [✔︎] User registration and persistence.
- [✔︎] User retrieval endpoint.
- [✔︎] Separate authentication identity management.
- [✔︎] Support for LOCAL, GOOGLE and APPLE identity types.

### 🗄️ Database Integration

- [✔︎] Supabase PostgreSQL integration.
- [✔︎] Prisma ORM configuration.
- [✔︎] PostgreSQL driver adapter.
- [✔︎] Database schema and migrations.
- [✔︎] Initial User and AuthIdentity models.

### ⚙️ Backend Infrastructure

- [✔︎] NestJS application setup.
- [✔︎] Fastify integration.
- [✔︎] Modular application structure.
- [✔︎] Global configuration management.
- [✔︎] Global request validation.
- [✔︎] Environment-based port configuration.
- [✔︎] Health-check endpoint.
- [✔︎] Render deployment.

---

## 🔌 API Endpoints

The following endpoints are currently implemented.

| Method | Endpoint | Description |
|---|---|---|
| 🟢 GET | `/health` | Backend health check |
| 🔵 POST | `/users` | Register a new user |
| 🟢 GET | `/users` | Retrieve users |
| 🔵 POST | `/auth/login` | Manual login |
| 🔵 POST | `/auth/google` | Google authentication |
| 🔵 POST | `/auth/apple` | Apple authentication |
| 🟢 GET | `/auth/me` | Retrieve authenticated user |

**Authentication:** `/auth/me` requires a valid OneAI JWT. Public and protected access for the other routes should follow the current controller and guard configuration.

### ❤️ Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok",
  "service": "one-ai-backend",
  "timestamp": "ISO-8601 timestamp"
}
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git
- PostgreSQL / Supabase account

### 1️⃣ Clone Repository

```bash
git clone https://github.com/LuckyVishwa1104/OneAI-backend.git

cd OneAI-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root.

Refer to the Environment Variables section below.

### 4️⃣ Generate Prisma Client

```bash
npx prisma generate
```

### 5️⃣ Apply Database Migrations

```bash
npx prisma migrate deploy
```

### 6️⃣ Start Development Server

```bash
npm run start:dev
```

The backend will be available at:

```text
http://localhost:3000
```

### 7️⃣ Production Build

```bash
npm run build
npm run start:prod
```

---

## 🔑 Environment Variables

The backend uses environment variables for database connections, authentication, and application configuration.

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection URL |
| `DIRECT_URL` | Direct database connection URL |
| `JWT_SECRET` | OneAI JWT signing secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key |
| `APPLE_CLIENT_ID` | Apple authentication client ID |
| `PORT` | Backend server port (default: 3000) |

> ⚠️ **Security Notice:** Never commit `.env` files, private keys, JWT secrets, or database credentials. Configure production secrets through Render environment settings.

---

## 🗄️ Database Architecture

OneAI uses **Supabase PostgreSQL** as its primary relational database, with Prisma ORM managing database operations.

### Current Database Models

**👤 User**

Stores application user information.

- `id`
- `name`
- `userId`
- `email`
- `createdAt`
- `updatedAt`

**🔐 AuthIdentity**

Stores authentication-provider information separately from the user record.

- `id`
- `userId`
- `provider`
- `providerUserId`
- `passwordHash`

Supported providers:

- `LOCAL`
- `GOOGLE`
- `APPLE`

Database schema and migration history are maintained through Prisma.

---

## 🧪 Testing

The backend uses Jest for automated testing.

Run the test suite:

```bash
npm test -- --runInBand
```

### Latest Recorded Test Results

```text
Test Suites: 5 passed, 5 total
Tests:       7 passed, 7 total
```

---

## ☁️ Deployment

The OneAI backend is currently deployed on **Render**.

Deployment configuration includes:

- Render web service.
- Production environment variables.
- Supabase PostgreSQL connectivity.
- NestJS production build.
- Health-check endpoint.

The application listens on the port provided by Render and binds to `0.0.0.0`.

---

## 🗺️ Development Roadmap

The following roadmap represents the planned development direction of OneAI.

### Phase 1 – Backend Foundation & Authentication

- [✔︎] NestJS application setup.
- [✔︎] Fastify integration.
- [✔︎] Prisma ORM integration.
- [✔︎] Supabase PostgreSQL connection.
- [✔︎] User registration and login.
- [✔︎] Google authentication.
- [✔︎] JWT authentication and authorization.
- [✔︎] Render deployment.

### Phase 2 – User & Application Management

- [ ] User profile management.
- [ ] User preferences and settings.
- [ ] Project management APIs.
- [ ] Conversation management APIs.
- [ ] Chat history and message persistence.

### Phase 3 – AI Integration & Orchestration

- [ ] AI provider integration.
- [ ] OpenAI integration.
- [ ] Gemini integration.
- [ ] Claude integration.
- [ ] Model selection and orchestration.
- [ ] Prompt management.

### Phase 4 – Advanced Infrastructure

- [ ] Server-Sent Events (SSE) streaming.
- [ ] Amazon S3 file and image storage.
- [ ] Redis caching.
- [ ] BullMQ background processing.
- [ ] Sentry error monitoring.
- [ ] AWS CloudWatch monitoring.

### Phase 5 – Production Readiness & Open Source

- [ ] Expanded unit and integration testing.
- [ ] API documentation.
- [ ] Security and performance improvements.
- [ ] Deployment optimization.
- [ ] Contributor documentation.
- [ ] Open-source release.

---

## 🧭 Guiding Principle

> **The Flutter application communicates only with the NestJS backend.**

https://one-ai-backend-jce9.onrender.com

NestJS acts as the central orchestration layer and is responsible for interacting with external services such as Firebase Authentication, Supabase PostgreSQL, Amazon S3, Redis, BullMQ, and AI providers.

This architectural separation:

- 🔐 Centralizes business logic and improves security.
- 🧩 Simplifies application maintenance.
- 📈 Enables independent service scaling.
- 🔄 Allows external services to be replaced without major changes to the Flutter application.

---

## 🤝 Contributing

OneAI is being developed with the intention of becoming an open-source project.

Contributor guidelines, development workflows, and contribution instructions will be added as the project approaches its public release.

---

<p align="center">
  <strong>⚡ OneAI – Building a Unified AI Experience.</strong>
  <br/>
  <sub>One platform. Multiple AI models. One unified experience.</sub>
</p>