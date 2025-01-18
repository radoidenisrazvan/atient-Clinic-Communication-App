const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');
const Doctor = require('../models/userType/Doctor');
const Patient = require('../models/userType/Patient');
const cloudinary = require('../config/cloudinaryConfig'); 

const router = express.Router();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_profiles', // specific folder from Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], 
  },
});

const upload = multer({ storage });


router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user =
      req.user.role === 'doctor'
        ? await Doctor.findById(req.user.id)
        : await Patient.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updateFields = req.body; 

    const user =
      req.user.role === 'doctor'
        ? await Doctor.findByIdAndUpdate(req.user.id, updateFields, { new: true })
        : await Patient.findByIdAndUpdate(req.user.id, updateFields, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Profile updated successfully.', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Both current and new passwords are required.' });
  }

  try {
    const user =
      req.user.role === 'doctor'
        ? await Doctor.findById(req.user.id)
        : await Patient.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/upload-image', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const user = req.user.role === 'doctor'
      ? await Doctor.findById(req.user.id)
      : await Patient.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No image uploaded.' });
    }

    user.imageUrl = req.file.path; 
    await user.save(); 

    res.status(200).json({ imageUrl: user.imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server error while uploading image.' });
  }
});

module.exports = router;
