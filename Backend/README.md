# API Documentation

## Users

### POST `/users/register`
Register a new user in the system.

**Request Body:**
```json
{
    "fullname": {
        "firstname": "John", // min 3 characters
        "lastname": "Doe"
    },
    "email": "john.doe@example.com", // valid email format
    "password": "securepassword123" // min 6 characters
}
```

**Response (201):**
```json
{
    "token": "jwt_token_here",
    "user": {
        "_id": "user_id_here",
        "fullname": {"firstname": "John", "lastname": "Doe"},
        "email": "john.doe@example.com"
    }
}
```

---

### POST `/users/login`
Authenticate a user and get JWT token.

**Request Body:**
```json
{
    "email": "john.doe@example.com", // valid email format
    "password": "securepassword123" // min 6 characters
}
```

**Response (200):** Same as register

---

### GET `/users/profile`
Get current user profile. **Requires Authentication**

**Response (200):** Returns user object

---

### GET `/users/logout`
Logout user and blacklist token. **Requires Authentication**

**Response (200):**
```json
{
    "message": "Logged out successfully"
}
```

---

## Captains

### POST `/captains/register`
Register a new captain with vehicle details.

**Request Body:**
```json
{
    "fullname": {
        "firstname": "John", // required, min 3 characters
        "lastname": "Smith"  // required
    },
    "email": "john.smith@example.com", // required, valid email format, unique
    "password": "securepass123", // required, min 6 characters
    "vehicle": {
        "color": "Black", // required, min 3 characters
        "plate": "ABC123", // required, min 3 characters
        "capacity": 4, // required, must be numeric
        "vehicleType": "car" // required, must be: car, bike, or auto
    }
}
```

**Response (201):**
```json
{
    "token": "jwt_token_here", // expires in 24h
    "captain": {
        "_id": "captain_id_here",
        "fullname": {
            "firstname": "John",
            "lastname": "Smith"
        },
        "email": "john.smith@example.com",
        "status": "inactive", // default status
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "location": {
            "lat": null, // will be updated later
            "lng": null  // will be updated later
        },
        "socketId": null,
        "createdAt": "2025-08-17T10:30:00.000Z",
        "updatedAt": "2025-08-17T10:30:00.000Z"
    }
}
```

---

### POST `/captains/login`
Authenticate a captain and get JWT token.

**Request Body:**
```json
{
    "email": "john.smith@example.com", // required, valid email format
    "password": "securepass123" // required, min 6 characters
}
```

**Response (200):**
```json
{
    "token": "jwt_token_here", // expires in 24h
    "captain": {
        "_id": "captain_id_here",
        "fullname": {
            "firstname": "John",
            "lastname": "Smith"
        },
        "email": "john.smith@example.com",
        "status": "inactive",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "location": {
            "lat": null,
            "lng": null
        },
        "socketId": null
    }
}
```

---

### GET `/captains/profile`
Get current captain profile. **Requires Authentication**

**Response (200):**
```json
{
    "captain": {
        "_id": "captain_id_here",
        "fullname": {
            "firstname": "John",
            "lastname": "Smith"
        },
        "email": "john.smith@example.com",
        "status": "inactive", // current status: active or inactive
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "location": {
            "lat": null, // current latitude
            "lng": null  // current longitude
        },
        "socketId": null
    }
}
```

---

### GET `/captains/logout`
Logout captain and blacklist token. **Requires Authentication**

**Response (200):**
```json
{
    "message": "Logged out successfully"
}
```

---

## Validation Rules
- **Email:** Must be valid format
- **Password:** Minimum 6 characters
- **Names:** Minimum 3 characters
- **Vehicle Types:** car, bike, auto
- **Vehicle fields:** color, plate (min 3 chars), capacity (numeric)

## Error Responses
- **400:** Validation errors or user/captain already exists
- **401:** Invalid credentials or unauthorized access
- **404:** Captain not found (profile endpoint)
- **500:**