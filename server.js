// backend/server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chatRoute = require('./routes/chat'); // CommonJS chat route
const carsRoute = require('./routes/cars'); // Cars route
const { router: authRoute } = require('./routes/auth'); // Auth routes
const subscriptionRoute = require('./routes/subscription'); // Subscription routes
const usedCarRoute = require('./routes/usedCars'); // Used cars routes
const dealerRoute = require('./routes/dealers'); // Dealer routes

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carbazar';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Basic middlewares
app.use(express.json());
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: allowedOrigin }));

// Routes
app.use('/api/chat', chatRoute);
app.use('/api/cars', carsRoute);
app.use('/api/auth', authRoute);
app.use('/api/subscription', subscriptionRoute);
app.use('/api/used-cars', usedCarRoute);
app.use('/api/dealers', dealerRoute);

// Health check
app.get('/', (req, res) => res.send('CarBazar backend running'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
