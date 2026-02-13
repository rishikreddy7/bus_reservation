# MERN Bus Reservation System

Complete conversion of PHP Bus Reservation System to MERN Stack (MongoDB, Express, React, Node.js)

## Project Structure

```
mern/
├── backend/           # Express.js + Node.js API
│   ├── models/        # MongoDB Schemas
│   ├── routes/        # API Routes
│   ├── controllers/    # Business Logic
│   ├── middleware/     # Auth & Validation
│   ├── server.js      # Main Server File
│   ├── package.json
│   └── .env
│
└── frontend/          # React Application
    ├── src/
    │   ├── pages/     # Page Components
    │   ├── components/# Reusable Components
    │   ├── services/  # API Services
    │   ├── context/   # Context API
    │   ├── styles/    # CSS Stylesheets
    │   ├── App.js
    │   └── index.js
    ├── public/
    └── package.json
```

## Installation & Setup

### Backend Setup
```bash
cd mern/backend
npm install
```

Create `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/bus_reservation
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

Start MongoDB:
```bash
mongod
```

Run server:
```bash
npm start       # Production
npm run dev     # Development with nodemon
```

### Frontend Setup
```bash
cd mern/frontend
npm install
npm start       # Starts on http://localhost:3000
```

## Features

### User Features
- ✅ User Registration & Login with JWT
- ✅ Search Buses by Route & Date
- ✅ View Available Seats
- ✅ Book Tickets with Passenger Details
- ✅ View Ticket Details
- ✅ My Bookings - View all bookings
- ✅ Cancel Bookings

### Admin Features
- ✅ Add Buses
- ✅ Add Routes
- ✅ Create Schedules
- ✅ View all Buses, Routes, Schedules

## API Endpoints

### Authentication
- `POST /api/auth/register` - User Registration
- `POST /api/auth/login` - User Login
- `GET /api/auth/me` - Get Current User

### Search
- `POST /api/search` - Search Buses

### Bookings
- `POST /api/bookings` - Create Booking
- `GET /api/bookings` - Get My Bookings
- `GET /api/bookings/:ticketId` - Get Booking Details
- `PUT /api/bookings/:ticketId/cancel` - Cancel Booking

### Admin
- `POST /api/admin/buses` - Add Bus
- `GET /api/admin/buses` - Get All Buses
- `POST /api/admin/routes` - Add Route
- `GET /api/admin/routes` - Get All Routes
- `POST /api/admin/schedules` - Add Schedule
- `GET /api/admin/schedules` - Get All Schedules

## Database Schema

### Users Collection
- name: String
- email: String (Unique)
- password: String (Hashed)
- role: String (user/admin)
- createdAt: Date

### Buses Collection
- busNumber: String (Unique)
- totalSeats: Number
- busType: String (Deluxe/Sleeper/Standard)
- createdAt: Date

### Routes Collection
- source: String
- destination: String
- travelTime: Number (in minutes)
- createdAt: Date

### Schedules Collection
- busId: ObjectId (ref: Bus)
- routeId: ObjectId (ref: Route)
- dateOfJourney: Date
- departureTime: String (HH:MM)
- arrivalTime: String (HH:MM)
- createdAt: Date

### Bookings Collection
- userId: ObjectId (ref: User)
- scheduleId: ObjectId (ref: Schedule)
- ticketId: String (Unique)
- bookingTime: Date
- status: String (confirmed/cancelled)
- passengers: Array
  - seatNumber: Number
  - passengerName: String
  - age: Number
  - gender: String

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs

### Frontend
- React 18
- React Router v6
- Axios
- Context API
- CSS3

## Authentication
- JWT Token-based Authentication
- Tokens stored in localStorage
- Protected Routes for authenticated users
- Admin-only routes for admin users
- Token expires in 7 days

## Responsive Design
- Mobile-friendly UI
- Bootstrap-like Grid System
- Flexible layouts for all screen sizes
- Touch-friendly buttons and inputs

## Features Preserved from PHP Version
✅ All user registration and login functionality
✅ Bus search by source, destination, and date
✅ Seat selection and availability checking
✅ Passenger details collection
✅ Ticket generation and display
✅ Booking management
✅ Admin panel for data management
✅ Data validation and error handling
✅ Security (password hashing, JWT)
✅ Same database structure (converted to MongoDB)

## Next Steps
1. Set up MongoDB locally or use MongoDB Atlas
2. Configure API_URL in frontend if backend is on different domain
3. Add payment gateway integration
4. Add email notifications
5. Add SMS notifications
6. Implement user profile management
7. Add advanced filters for search
