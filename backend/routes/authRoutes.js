const express = require("express");
const Doctor = require("../models/userType/Doctor");
const Patient = require("../models/userType/Patient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Înregistrare utilizator
router.post("/register", async (req, res) => {
  const {
    role,
    name,
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
    // Verifică dacă utilizatorul există deja
    const existingUser =
      role === "doctor"
        ? await Doctor.findOne({ email })
        : await Patient.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash-uiește parola
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (role === "doctor") {
      user = new Doctor({
        name,
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

    // Generează token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      id: user._id,
      role: user.role,
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
  const { email, password, role } = req.body;

  try {
    // Caută utilizatorul în colecția corespunzătoare
    const user =
      role === "doctor"
        ? await Doctor.findOne({ email })
        : await Patient.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generează token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
