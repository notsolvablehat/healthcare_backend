const mongoose = require("mongoose");

// Sub-schema for allergies within the medical profile
const allergySchema = new mongoose.Schema({
  name: { type: String, default: "NA" },
  severity: { type: String, default: "NA" },
  reaction: { type: String, default: "NA" },
});

// Sub-schema for chronic conditions within the medical profile
const conditionSchema = new mongoose.Schema({
  name: { type: String, default: "NA" },
  diagnosedDate: { type: String, default: "NA" },
  status: { type: String, default: "NA" },
});

// Sub-schema for medications within the medical profile
const medicationSchema = new mongoose.Schema({
  name: { type: String, default: "NA" },
  dosage: { type: String, default: "NA" },
  frequency: { type: String, default: "NA" },
  purpose: { type: String, default: "NA" },
});

// Sub-schema for family medical history
const familyHistorySchema = new mongoose.Schema({
  condition: { type: String, default: "NA" },
  relation: { type: String, default: "NA" },
});

// Sub-schema for notification settings
const notificationSettingsSchema = new mongoose.Schema({
  email: { type: Boolean, default: true },
  sms: { type: Boolean, default: true },
  app: { type: Boolean, default: true },
  appointmentReminders: { type: Boolean, default: true },
  medicationReminders: { type: Boolean, default: false },
  systemUpdates: { type: Boolean, default: true },
});

// Sub-schema for privacy settings
const privacySettingsSchema = new mongoose.Schema({
  profileVisibility: { type: String, default: "Colleagues only" },
  dataSharing: { type: String, default: "Limited" },
  researchParticipation: { type: Boolean, default: false },
});

// Sub-schema for accessibility settings
const accessibilitySettingsSchema = new mongoose.Schema({
  highContrast: { type: Boolean, default: false },
  largeText: { type: Boolean, default: false },
  screenReader: { type: Boolean, default: false },
});

// Sub-schema for connected devices
const connectedDeviceSchema = new mongoose.Schema({
  name: { type: String },
  lastActive: { type: Date },
  location: { type: String },
});

// Sub-schema for login history
const loginHistorySchema = new mongoose.Schema({
  date: { type: Date },
  device: { type: String },
  location: { type: String },
  ip: { type: String },
});

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
  role: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    default: "NA",
  },
  dateOfBirth: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Female", "Male", "Non-binary", "Other"],
  },
  bloodType: {
    type: String,
  },
  address: {
    street: { type: String, default: "NA" },
    city: { type: String, default: "NA" },
    state: { type: String, default: "NA" },
    zipCode: { type: String, default: "NA" },
    country: { type: String, default: "India" },
  },
  emergencyContact: {
    name: { type: String, default: "NA" },
    relationship: { type: String, default: "NA" },
    phone: { type: String, default: "NA" },
  },
  biography: {
    type: String,
    default: "NA",
  },
  medicalProfile: {
    allergies: [allergySchema],
    chronicConditions: [conditionSchema],
    medications: [medicationSchema],
    familyHistory: [familyHistorySchema],
  },
  accountSettings: {
    language: { type: String, default: "English" },
    timeZone: { type: String, default: "Asia/Kolkata" },
    notifications: notificationSettingsSchema,
    privacy: privacySettingsSchema,
    accessibility: accessibilitySettingsSchema,
    connectedDevices: [connectedDeviceSchema],
  },
  securitySettings: {
    lastPasswordChange: { type: Date },
    twoFactorEnabled: { type: Boolean, default: true },
    recoveryEmail: { type: String },
    loginHistory: [loginHistorySchema],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "'password' must be at least 8 characters long"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
