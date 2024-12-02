require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/dbConfig');

const authRoutes = require('./routes/authRoutes');
const bikeRoutes = require('./routes/bikeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectToDatabase();

// Routes
app.use('/auth', authRoutes);
app.use('/bikes', bikeRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
