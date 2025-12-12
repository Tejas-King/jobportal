const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config(); // Load env variables

const app = express();

// Middleware Stack (executed in order)
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

// Database
connectDB();

// API Routes
app.use('/api/jobs', jobRoutes);

// Error Handling (MUST be after routes)
app.use(notFound); // 404 for unknown routes
app.use(errorHandler); // Global error handler

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});