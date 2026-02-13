# Quick Start Guide - MERN Bus Reservation System

## ⚡ 5-Minute Setup

### Step 1: Install MongoDB
**Windows:**
- Download from: https://www.mongodb.com/try/download/community
- Run installer and follow instructions

**Mac (with Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### Step 2: Clone/Navigate to Project
```bash
cd c:\PROJECTS\dbms_mini_project\mern
```

### Step 3: Setup Backend

**Open Terminal 1:**
```bash
cd backend
npm install
npm run dev
```

You should see: "Server running on port 5000"

### Step 4: Setup Frontend

**Open Terminal 2:**
```bash
cd frontend
npm install
npm start
```

Browser will open automatically at http://localhost:3000

---

## 🎯 Test the Application

### Admin Account Setup
1. Register as a new user (or use admin role in database)
2. Add sample data through Admin Panel

### Sample Test Data

**Add Route:**
- Source: Delhi
- Destination: Mumbai
- Travel Time: 360 mins

**Add Bus:**
- Bus Number: BUS-001
- Total Seats: 40
- Bus Type: Deluxe

**Add Schedule:**
- Bus: BUS-001
- Route: Delhi → Mumbai
- Date: Any future date
- Departure: 10:00
- Arrival: 16:00

### User Testing
1. Register/Login as regular user
2. Search for buses (Delhi → Mumbai)
3. Select date and click Search
4. Click "Book Now"
5. Select seats and enter passenger details
6. Complete booking
7. View ticket details
8. Go to "My Bookings" to see all bookings

---

## 📁 Important Files to Know

### Backend
```
backend/
├── server.js                    # Main entry point
├── .env                         # Configuration (edit this!)
├── models/                      # Database schemas
├── controllers/                 # Business logic
└── routes/                      # API endpoints
```

### Frontend
```
frontend/
├── src/
│   ├── App.js                   # Main app component
│   ├── pages/                   # Page components
│   ├── services/api.js          # API calls
│   ├── context/AuthContext.js   # User state
│   └── styles/                  # CSS files
└── package.json
```

---

## 🔧 Configuration Changes

### If Backend is on Different Machine

Edit `frontend/src/services/api.js`:
```javascript
const API_URL = 'http://192.168.1.100:5000/api'; // Change to your server IP
```

### If Using MongoDB Atlas (Cloud)

Edit `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bus_reservation
```

---

## ✅ Verify Everything Works

### Backend Check
```bash
# In backend folder
npm run dev
```
Look for: "MongoDB connected" and "Server running on port 5000"

### Frontend Check
```bash
# In frontend folder
npm start
```
Browser opens at http://localhost:3000

### Test API
Open your browser and visit:
```
http://localhost:5000/api/admin/buses
```
(Should show JSON with buses - if empty, that's fine)

---

## 🐛 Troubleshooting

### Port 5000 Already in Use
```bash
# Find what's using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows: Check Services (mongod should be running)
# Mac/Linux:
brew services list  # Mac
sudo systemctl status mongodb  # Linux
```

### npm install Errors
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 Already in Use (React)
Set different port:
```bash
# Mac/Linux
PORT=3001 npm start

# Windows PowerShell
$env:PORT=3001; npm start
```

---

## 📱 Frontend Routes

| Route | Purpose | Requires Login |
|-------|---------|----------------|
| `/` | Home page | No |
| `/login` | User login | No |
| `/register` | New user registration | No |
| `/search` | Search results | Yes |
| `/book/:scheduleId` | Booking page | Yes |
| `/ticket/:ticketId` | Ticket details | No |
| `/my-bookings` | My bookings | Yes |
| `/admin` | Admin panel | Yes (Admin only) |

---

## 💾 Database

### Verify MongoDB Data
```bash
# Connect to MongoDB shell
mongo

# Use database
use bus_reservation

# Check collections
show collections

# View users
db.users.find()

# View buses
db.buses.find()
```

---

## 📊 Project Features at a Glance

✅ User Registration & Login (with JWT)
✅ Search Buses (by source, destination, date)
✅ Book Tickets (with seat selection)
✅ View Bookings (personal and detailed)
✅ Cancel Bookings
✅ Admin Panel (add buses, routes, schedules)
✅ Responsive Design (mobile-friendly)
✅ Modern UI (clean and professional)
✅ Input Validation
✅ Error Handling

---

## 🎨 CSS Customization

All styles are in `frontend/src/styles/`
- `globals.css` - Base styles
- `home.css` - Home page
- `auth.css` - Login/Register
- `search.css` - Search results
- `booking.css` - Booking page
- `ticket.css` - Ticket details
- `mybookings.css` - Bookings list
- `admin.css` - Admin panel

---

## 🚀 Production Deployment

### Backend (Heroku, Railway, Render)
1. Create account on hosting platform
2. Connect GitHub repository
3. Set environment variables in dashboard
4. Deploy

### Frontend (Vercel, Netlify)
1. Build optimized version: `npm run build`
2. Deploy `build/` folder
3. Set API_URL to production backend

---

## 📞 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| "MongoDB connection failed" | Start MongoDB service |
| "Port already in use" | Kill process using port or use different port |
| "CORS error" | Check API_URL in frontend/src/services/api.js |
| "401 Unauthorized" | Check JWT token in localStorage |
| "Blank page" | Check browser console for errors (F12) |

---

## 📖 Next Steps

1. ✅ Get it running (this guide)
2. ✅ Add sample data through admin panel
3. ✅ Test user features
4. ✅ Test booking workflow
5. 📘 Read README.md for detailed docs
6. 🔧 Read CONVERSION_SUMMARY.md for technical details
7. 🎨 Customize CSS to your liking
8. 🚀 Deploy to production

---

## 💡 Tips & Tricks

### Quick Admin User Creation
You can manually add admin user via MongoDB:
```javascript
db.users.insertOne({
  name: "Admin",
  email: "admin@example.com",
  password: "$2a$10...",  // bcrypt hash
  role: "admin"
})
```

### Reset All Data
```javascript
// Clear all collections
db.users.deleteMany({})
db.buses.deleteMany({})
db.routes.deleteMany({})
db.schedules.deleteMany({})
db.bookings.deleteMany({})
```

---

**Happy Coding! 🎉**

If you need help, check the README.md or CONVERSION_SUMMARY.md files.
