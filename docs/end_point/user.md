# Manual Create User -

Purpose: Creates a new OneAI account using name, user ID and password.

Full URL: http://localhost:3000/users

Header: Content-Type: application/json

Request body:
{
  "name": "Lucky Vishwakarma",
  "userId": "lucky123",
  "password": "Password@123",
  "confirmPassword": "Password@123"
}

Response body: 
{
    "id": 11,
    "name": "James Bond",
    "userId": "james125",
    "createdAt": "2026-11-13T03:22:37.025Z"
}

e.g.:

curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{
  "name": "Jamess Bonds",
  "userId": "james129",
  "password": "Apple@123",
  "confirmPassword": "Apple@123"
}'
