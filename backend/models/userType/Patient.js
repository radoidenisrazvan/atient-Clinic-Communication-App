const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
    role: {
      type: String,
      default: "patient",
    },
    name: {
      type: String,
      required: true, // Numele
    },
    surname: {
      type: String,
      required: true, // Prenumele
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Adaugă automat createdAt și updatedAt
  }
);

module.exports = mongoose.model("Patient", patientSchema);
