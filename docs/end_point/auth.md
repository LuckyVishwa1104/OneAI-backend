# Manual Login -

Purpose: Authenticates an existing account using user ID and password.

Full URL: http://localhost:3000/auth/login

Header: Content-Type: application/json

Request body:
{
  "userId": "james123",
  "password": "Apple@123"
}

Response body:
{
    "accessToken": "one-ai-jwt-token",
    "user": {
        "id": 9,
        "name": "James Bond",
        "userId": "james123"
    }
}

curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "userId": "james123",
  "password": "Apple@123"
}'


# Google Login -

Purpose: Authenticates a user through Google/Firebase identity verification.

Full URL: http://localhost:3000/auth/google

Header: Content-Type: application/json

Request body:
{
  "idToken": "<FIREBASE_ID_TOKEN>"
}

Response:
{
    "accessToken": "one-ai-jwt-token",
    "user": {
        "id": 6,
        "name": "Lucky Vishwakarma",
        "userId": null,
        "email": "lucky.vishwakarma1104@gmail.com"
    }
}

curl -X POST http://localhost:3000/auth/google \
-H "Content-Type: application/json" \
-d '{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgxODA1ZTc2ZmQ1ZmEyZmQ5MWMyYmIzOWU0YjdlZjA1NDY5YmRkY2UiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTHVja3kgVmlzaHdha2FybWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmlzUk5mS1c3aWJJUGZzT3dtajJ4X21ONWY2UzFndV9xSVMwWWs3UFMzVVVBSFlRPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL29uZWFpLWI4NmQ0IiwiYXVkIjoib25lYWktYjg2ZDQiLCJhdXRoX3RpbWUiOjE3OTQ1NjAxMDMsInVzZXJfaWQiOiJ0WXplVXV3cEYwUnlXc2dNRU1VZzA5WVdhb20yIiwic3ViIjoidFl6ZVV1d3BGMFJ5V3NnTUVNVWcwOVlXYW9tMiIsImlhdCI6MTc5NDU2MDEwNywiZXhwIjoxNzk0NTYzNzA3LCJlbWFpbCI6Imx1Y2t5LnZpc2h3YWthcm1hMTEwNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNTg4OTY5NTkxMjc2MDQ5NTk3OSJdLCJlbWFpbCI6WyJsdWNreS52aXNod2FrYXJtYTExMDRAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.NRkhY_L53uA_P1ytqRftvXTq1MoEWu2YE05Wt2vNwPOB1NHId9_H0LggFRnNv09-9UDeBFmHPWElg0USstaoVYSrY5FKy2MkNeEGpLDPosRbHYaupbVfcWo4LtyHenV2ZcXCUZMWTAe-40Zn2DlD0-q6e18S65T0NOcFQWzsSINJtKN2blBdK0SWjkiYVcnEjGCtf2lnQklXBC6v0l2n9ZLuV9ZTcaH7w5MZ-O2fMW5dIOA-bFWz84q8-LwGuyzMnmoVIurXlV_e5DfX3oYIl3Jo32WarRIMgx2hC7A9Bh6nHM-Wsn21PXt2OIR5b0ZqYjzKMnLPIXgoG1IyjcA0Sg"
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

Response body:
{
    "id": 9,
    "name": "James Bond",
    "userId": "james123",
    "email": null,
    "createdAt": "2026-11-12T07:43:03.850Z",
    "updatedAt": "2026-11-12T07:43:03.850Z"
}

curl -X GET http://localhost:3000/auth/me \
-H "Authorization: Bearer YOUR_JWT_TOKEN" 


