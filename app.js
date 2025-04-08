// Import required packages
const express = require('express');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/public')));

// Set up view engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Import routes
const indexRoutes = require('./src/routes/index');
const itemRoutes = require('./src/routes/items');
const userRoutes = require('./src/routes/users');

// Use routes
app.use('/', indexRoutes);
app.use('/items', itemRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
