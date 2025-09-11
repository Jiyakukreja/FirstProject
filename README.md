
# Raahi — Ride Booking Platform

Raahi is a full-stack ride booking application built with React (frontend) and Node.js/Express (backend). It allows users to book rides, captains to accept/decline rides, and provides real-time location and payment features.

## Project Structure

```
Raahi/
├── Backend/
│   ├── app.js
│   ├── server.js
│   ├── .env
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── images/
│   │   ├── pages/
│   │   └── ...
│   ├── public/
│   ├── .env
│   └── ...
└── README.md
```

---

## Backend (Node.js/Express)

### Main Files
- `app.js`: Express app setup, middleware, routes.
- `server.js`: Starts the HTTP server.
- `.env`: Environment variables (MongoDB URI, JWT secret, Google Maps API key, etc).
- `controllers/`: Route handlers for users, captains, rides, maps.
- `models/`: Mongoose models for User, Captain, Ride, BlackListToken.
- `routes/`: Express route definitions for users, captains, rides, maps.
- `services/`: Business logic (e.g., geocoding, user/captain/ride services).
- `middlewares/`: Auth middleware for JWT verification.

### Key Endpoints

#### User APIs
- `POST /users/signup` — Register a new user
- `POST /users/login` — Login and get JWT
- `GET /users/profile` — Get user profile (auth required)

#### Captain APIs
- `POST /captain/signup` — Register a new captain
- `POST /captain/login` — Login and get JWT
- `GET /captain/profile` — Get captain profile (auth required)

#### Ride APIs
- `POST /ride/book` — Book a ride
- `GET /ride/history` — Get ride history
- `POST /ride/accept` — Captain accepts a ride
- `POST /ride/decline` — Captain declines a ride

#### Maps API
- `GET /maps/get-coordinates?address=...` — Get latitude/longitude for an address (auth required)
  - **Input:** Query param `address` (string, min 3 chars)
  - **Output:** `{ coordinates: { latitude, longitude } }` or error message

### Backend Input/Output Example

**Request:**
```
GET /maps/get-coordinates?address=New Delhi, India
Authorization: Bearer <JWT>
```
**Response:**
```
{
  "coordinates": {
	 "latitude": 28.6139391,
	 "longitude": 77.2090212
  }
}
```

---

## Frontend (React + Vite)

### Main Files
- `src/App.jsx`: Main app component, routing.
- `src/components/`: UI components (RidePopUp, ConfirmRidePopUp, LocationSearchPanel, etc).
- `src/pages/`: Page-level components (Home, CaptainHome, Riding, etc).
- `src/context/`: React context for user/captain state.
- `src/images/`: App images and assets.

### Features
- User and Captain authentication (signup/login)
- Book a ride, view ride status, payment
- Animated UI with GSAP, framer-motion
- OTP verification for ride confirmation
- Google Maps integration for address search
- Responsive, modern UI with Tailwind CSS

---

## How to Run

### Backend
1. Install dependencies:
	```
	cd Backend
	npm install
	```
2. Set up `.env` with MongoDB URI, JWT secret, Google Maps API key.
3. Start server:
	```
	npx nodemon server.js
	```

### Frontend
1. Install dependencies:
	```
	cd frontend
	npm install
	```
2. Start frontend:
	```
	npm run dev
	```

---

## Environment Variables

### Backend `.env`
```
MONGO_URI=your_mongo_uri
PORT=4000
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Frontend `.env`
- Add any frontend-specific environment variables if needed.

---

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, GSAP, framer-motion
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Google Maps API

---

## Notes
- All backend endpoints require JWT authentication except signup/login.
- Maps API requires a valid Google Maps Geocoding API key.
- For any address lookup, use `/maps/get-coordinates` with a valid JWT.
- UI is designed to be modern, compact, and user-friendly.

---

## License
MIT


...
### GET `/get-fare`
**Description:** Calculates the fare for a ride based on the provided pickup and destination locations.

**Authentication:**  
Requires a valid JWT in the `Authorization` header.

**Query Parameters:**
- `pickup` (string): The starting location (minimum 3 characters).
- `destination` (string): The destination location (minimum 3 characters).

**Response (200):**
```json
{
  "fare": {
    "auto": "calculated_fare_value",
    "car": "calculated_fare_value",
    "moto": "calculated_fare_value"
  }
}