# Manual Login -

Purpose: Authenticates an existing account using user ID and password.

Full URL: http://localhost:3000/auth/login

Header: Content-Type: application/json

Request body:
{
  "userId": "lucky123",
  "password": "Password@123"
}

Response:


# Google Login -

Purpose: Authenticates a user through Google/Firebase identity verification.

Full URL: http://localhost:3000/auth/google

Header: Content-Type: application/json

Request body:
{
  "idToken": "<FIREBASE_ID_TOKEN>"
}

Response:


# Apple Login -

Purpose: Authenticates a user using Apple Sign-In.

Full URL: http://localhost:3000/auth/apple

Header: Content-Type: application/json

Request body:
{
  "idToken": "<FIREBASE_ID_TOKEN>"
}

Response:


# Get current authenticated user - either manual/google/apple

Purpose: Retrieves the profile belonging to the currently authenticated user.

Full URL: http://localhost:3000/auth/me

Authorization: Bearer <ONEAI_JWT_TOKEN>

Request body: not required

Response: 


