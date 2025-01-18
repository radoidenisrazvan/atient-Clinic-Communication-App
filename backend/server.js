const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
dotenv.config(); 

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//Rute 
app.use("/api/auth", authRoutes);
app.use("/api/user", profileRoutes);

// Rute de test
app.get("/", (req, res) => {
  res.send("Server is running...");
});


// Conectare la MongoDB și pornire server
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
