const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  userType: {
    type: String,
    enum: ["patient", "doctor"],
    required: true,
  },
  certificationPath: {
    type: String,
    required: function () {
      return this.userType === "doctor";
    },
  },
  specialization: {
    type: String,
    required: function () {
      return this.userType === "doctor";
    },
    enum: [
      "Cardiology",
      "Dermatology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
      "Oncology",
      "Radiology",
      "General Surgery",
      "Other",
    ],
  },
  emailId: {
    type: String,
    required: true,
    minlength: [6, "Email ID must be at least 6 characters long"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "'password' must be at least 8 characters long"],
  },
  termsAccepted: {
    type: Boolean,
    required: true,
    enum: [true, false]
  },

  profile: {
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
  },

  medicalHistory: [
    new mongoose.Schema({
        condition: { type: String, required: true },
        diagnosisDate: { type: Date, required: true },
        notes: String,
    }),
    ]

});

const user = mongoose.model("user", userSchema);

module.exports = user;