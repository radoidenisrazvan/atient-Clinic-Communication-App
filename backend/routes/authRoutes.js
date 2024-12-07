const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Înregistrare utilizator
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Verifică dacă utilizatorul există
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Creează utilizatorul
      const user = await User.create({ name, email, password });
  
      // Generează token-ul JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Logare utilizator
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
