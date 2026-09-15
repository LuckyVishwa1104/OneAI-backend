For OneAI, I'd start with these two models:

User
  │
  │ 1:N
  ▼
AuthIdentity
User

The application-level identity.

User
├── id
├── email
├── name
├── avatarUrl
├── createdAt
└── updatedAt
AuthIdentity

The authentication-provider identity.

AuthIdentity
├── id
├── userId
├── provider
├── providerUserId
├── createdAt
└── updatedAt

So a Google login could look conceptually like:

User
--------------------------------
id:        usr_123
email:     user@example.com
name:      Lucky
avatarUrl: ...

and:

AuthIdentity
--------------------------------
id:             identity_123
userId:         usr_123
provider:       GOOGLE
providerUserId: 108234923842...

Later Apple:

AuthIdentity
--------------------------------
id:             identity_456
userId:         usr_123
provider:       APPLE
providerUserId: abc123...

Both point to the same OneAI User.

User.id
    ↓
primary OneAI identity


