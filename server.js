const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./config/db');
const authRoutes = require('./src/routes/authRoutes');
const roleRoutes = require('./src/routes/roleRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
