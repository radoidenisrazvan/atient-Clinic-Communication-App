const express = require("express");
const Doctor = require("../models/userType/Doctor");
const Patient = require("../models/userType/Patient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware pentru autentificare

const router = express.Router();

// Middleware pentru validarea datelor de înregistrare
const validateRegisterData = (req, res, next) => {
  const { role, name, email, password } = req.body;

  if (!role || !["doctor", "patient"].includes(role)) {
    return res.status(400).json({ message: "Invalid or missing role." });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  next();
};

// Înregistrare utilizator
router.post("/register", validateRegisterData, async (req, res) => {
  const {
    role,
    name,
    surname,
    email,
    password,
    phone,
    professionalGrade,
    speciality,
    workSchedule,
    address,
    birthDate,
    bloodType,
    weight,
    height,
  } = req.body;

  try {
    const existingUser =
      role === "doctor"
        ? await Doctor.findOne({ email })
        : await Patient.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (role === "doctor") {
      user = new Doctor({
        name,
        surname,
        email,
        password: hashedPassword,
        phone,
        professionalGrade,
        speciality,
        workSchedule,
      });
    } else if (role === "patient") {
      user = new Patient({
        name,
        surname,
        email,
        password: hashedPassword,
        phone,
        address,
        birthDate,
        bloodType,
        weight,
        height,
      });
    }

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully.",
      id: user._id,
      role,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Error in /register:", error.message);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// Logare utilizator
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email, password, and role are required." });
  }

  try {
    const user =
      role === "doctor"
        ? await Doctor.findOne({ email })
        : await Patient.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      id: user._id,
      role,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Error in /login:", error.message);
    res.status(500).json({ message: "Server error during login." });
  }
});

// Preluarea datelor utilizatorului
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user =
      req.user.role === "doctor"
        ? await Doctor.findById(req.user.id)
        : await Patient.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Actualizarea datelor utilizatorului
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, phone } = req.body;

    const user =
      req.user.role === "doctor"
        ? await Doctor.findByIdAndUpdate(req.user.id, { name, phone }, { new: true })
        : await Patient.findByIdAndUpdate(req.user.id, { name, phone }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
