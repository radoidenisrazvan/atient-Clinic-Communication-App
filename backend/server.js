const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware pentru JSON
app.use(express.json());

// Conectare la MongoDB
connectDB();

// Rute de bază
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Pornire server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

