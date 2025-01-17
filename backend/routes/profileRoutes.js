const express = require("express");
const Doctor = require("../models/userType/Doctor");
const Patient = require("../models/userType/Patient");
const authMiddleware = require("../middleware/authMiddleware");
const bcrypt = require("bcryptjs");

const router = express.Router();

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
    const updateFields = req.body; // Toate câmpurile trimise de frontend

    const user =
      req.user.role === "doctor"
        ? await Doctor.findByIdAndUpdate(req.user.id, updateFields, { new: true })
        : await Patient.findByIdAndUpdate(req.user.id, updateFields, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Endpoint pentru schimbarea parolei
router.post("/change-password", authMiddleware, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new passwords are required." });
    }
  
    try {
      // Găsește utilizatorul în funcție de rol
      const user =
        req.user.role === "doctor"
          ? await Doctor.findById(req.user.id)
          : await Patient.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Verifică parola curentă
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Current password is incorrect." });
      }
  
      // Hash-uiește și actualizează noua parolă
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Server error." });
    }
  });

module.exports = router;
