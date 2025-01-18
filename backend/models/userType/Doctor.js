const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    role: {
      type: String,
      default: "doctor",
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true, 
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
    imageUrl: {
      type: String,
      default: null 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
