# Manual Login -

Purpose: Authenticates an existing account using user ID and password.

Full URL: http://localhost:3000/auth/login

Header: Content-Type: application/json

Request body:
{
  "userId": "lucky123",
  "password": "Password@123"
}

curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "userId": "lucky123",
  "password": "Password@123"
}'


# Google Login -

Purpose: Authenticates a user through Google/Firebase identity verification.

Full URL: http://localhost:3000/auth/google

Header: Content-Type: application/json

Request body:
{
  "idToken": "<FIREBASE_ID_TOKEN>"
}

curl -X POST http://localhost:3000/auth/google \
-H "Content-Type: application/json" \
-d '{
  "idToken": "YOUR_FIREBASE_ID_TOKEN"
}'


# Apple Login -

Purpose: Authenticates a user using Apple Sign-In.

Full URL: http://localhost:3000/auth/apple

Header: Content-Type: application/json

Request body:
{
  "idToken": "<FIREBASE_ID_TOKEN>"
}


# Get current authenticated user - either manual/google/apple

Purpose: Retrieves the profile belonging to the currently authenticated user.

Full URL: http://localhost:3000/auth/me

Authorization: Bearer <ONEAI_JWT_TOKEN>

Request body: not required

curl -X GET http://localhost:3000/auth/me \
-H "Authorization: Bearer YOUR_JWT_TOKEN" 


