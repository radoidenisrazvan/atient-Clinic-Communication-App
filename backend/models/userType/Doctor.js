const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    role: {
      type: String,
      default: "doctor",
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
    professionalGrade: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    workSchedule: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adaugă automat createdAt și updatedAt
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
