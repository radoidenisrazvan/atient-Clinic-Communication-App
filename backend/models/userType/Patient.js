const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
    role: {
      type: String,
      default: "patient",
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
    imageUrl: {
      type: String,
      default: null 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Patient", patientSchema);
