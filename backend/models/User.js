const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["doctor", "patient"], // Tipuri de utilizatori permise
      required: true,
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
    // Specific pentru doctori
    professionalGrade: {
      type: String,
      required: function () {
        return this.role === "doctor";
      },
    },
    speciality: {
      type: String,
      required: function () {
        return this.role === "doctor";
      },
    },
    workSchedule: {
      type: String,
      required: function () {
        return this.role === "doctor";
      },
    },
    // Specific pentru pacienți
    address: {
      type: String,
      required: function () {
        return this.role === "patient";
      },
    },
    birthDate: {
      type: Date,
      required: function () {
        return this.role === "patient";
      },
    },
    bloodType: {
      type: String,
      required: function () {
        return this.role === "patient";
      },
    },
    weight: {
      type: Number,
      required: function () {
        return this.role === "patient";
      },
    },
    height: {
      type: Number,
      required: function () {
        return this.role === "patient";
      },
    },
  },
  {
    timestamps: true, // Adaugă automat createdAt și updatedAt
  }
);

// Hash-uiește parola înainte de salvare
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Metodă pentru verificarea parolei
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
