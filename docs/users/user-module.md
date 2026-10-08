# User Module

## Overview

The User module currently supports manual user registration and authentication using:

* User ID
* Password
* JWT

Google and Apple authentication are planned for later.

## Database

The module uses PostgreSQL with Prisma.

### User

```text
User
├── id
├── name
├── userId
├── email
├── createdAt
└── updatedAt
```

### AuthIdentity

Authentication details are stored separately.

```text
AuthIdentity
├── id
├── userId
├── provider
├── providerUserId
└── passwordHash
```

Supported providers:

```text
LOCAL
GOOGLE
APPLE
```

Currently, only `LOCAL` is implemented.

---

# Endpoints

## 1. Get All Users

```http
GET /users
```

### Example

```http
GET http://localhost:3000/users
```

### Response

```json
[
  {
    "id": 1,
    "name": "Lucky Vishwakarma",
    "userId": "lucky123",
    "email": null,
    "createdAt": "2026-10-01T10:00:00.000Z",
    "updatedAt": "2026-10-01T10:00:00.000Z"
  }
]
```

---

## 2. Register User

```http
POST /users
```

### Request

```json
{
  "name": "Lucky Vishwakarma",
  "userId": "lucky123",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Response

```json
{
  "id": 1,
  "name": "Lucky Vishwakarma",
  "userId": "lucky123",
  "createdAt": "2026-10-01T10:00:00.000Z"
}
```

Password is hashed using `bcrypt` and is never returned.

---

## 3. Manual Login

```http
POST /auth/login
```

### Request

```json
{
  "userId": "lucky123",
  "password": "password123"
}
```

### Response

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Lucky Vishwakarma",
    "userId": "lucky123"
  }
}
```

The returned `accessToken` is used for authenticated requests.

---

## 4. Get Current User

```http
GET /auth/me
```

### Header

```http
Authorization: Bearer <accessToken>
```

### Response

```json
{
  "id": 1,
  "name": "Lucky Vishwakarma",
  "userId": "lucky123",
  "email": null,
  "createdAt": "2026-10-01T10:00:00.000Z",
  "updatedAt": "2026-10-01T10:00:00.000Z"
}
```

This endpoint is protected using `JwtAuthGuard`.

---

## API Summary

| Method | Endpoint      | Purpose          | Auth |
| ------ | ------------- | ---------------- | ---- |
| `GET`  | `/users`      | Get all users    | None |
| `POST` | `/users`      | Register user    | None |
| `POST` | `/auth/login` | Manual login     | None |
| `GET`  | `/auth/me`    | Get current user | JWT  |

## Authentication Flow

```text
POST /users
    ↓
Create User + LOCAL AuthIdentity
    ↓
POST /auth/login
    ↓
Verify User ID + Password
    ↓
Generate JWT
    ↓
GET /auth/me
    ↓
Validate JWT
    ↓
Return Current User
```

## Current Status

* Manual registration — ✅
* Manual login — ✅
* Password hashing — ✅
* JWT generation — ✅
* JWT validation — ✅
* Protected `/auth/me` — ✅
* Google login — ⏳
* Apple login — ⏳
