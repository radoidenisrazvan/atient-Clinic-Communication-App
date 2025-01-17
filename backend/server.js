const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Importă funcția de conectare la MongoDB
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
dotenv.config(); // Încarcă variabilele din fișierul .env

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//Rute 
app.use("/api/auth", authRoutes);
app.use("/api/user", profileRoutes);

// Rute de test
app.get("/", (req, res) => {
  res.send("Server is running...");
});


// Conectare la MongoDB și pornire server
const PORT = process.env.PORT || 5000;

connectDB(); // Conectează la baza de date

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
