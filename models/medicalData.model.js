const mongoose = require("mongoose");

const allergySchema = new mongoose.Schema({
  name: { type: String, default: "NA" },
  severity: { type: String, default: "NA" },
  reaction: { type: String, default: "NA" },
});

const conditionSchema = new mongoose.Schema({
  name: { type: String, default: "NA" },
  diagnosedDate: { type: String, default: "NA" },
  status: { type: String, default: "NA" },
});

const medicationSchema = new mongoose.Schema({
  name: { type: String, default: "NA" },
  dosage: { type: String, default: "NA" },
  frequency: { type: String, default: "NA" },
  purpose: { type: String, default: "NA" },
});

const familyHistorySchema = new mongoose.Schema({
  condition: { type: String, default: "NA" },
  relation: { type: String, default: "NA" },
});

const labResultSchema = new mongoose.Schema({
  testName: { type: String },
  value: { type: String },
  unit: { type: String },
  referenceRange: { type: String },
  flag: { type: String, enum: ["High", "Low", "Normal", "NA"] },
});

const clinicalSummarySchema = new mongoose.Schema({
  diagnosis: [{ type: String }],
  clinicalHistory: { type: String, default: "" },
  examinationFindings: { type: String, default: "" },
  prognosis: { type: String, default: "" },
});

const medicalSchema = new mongoose.Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  dateOfBirth: { type: String, default: "" },
  gender: { type: String, enum: ["male", "female", "other", "NA"], default: "NA" },
  patientId: { type: String, default: "" },
  reportDate: { type: String, default: "" },
  physicianName: { type: String, default: "" },
  clinicName: { type: String, default: "" },

  emailId: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },

  reportName: {type: String, default: "unknown"},

  medicalProfile: {
    allergies: [allergySchema],
    chronicConditions: [conditionSchema],
    medications: [medicationSchema],
    familyHistory: [familyHistorySchema],
    labResults: [labResultSchema],
    clinicalSummary: clinicalSummarySchema,
  },
});

module.exports = mongoose.model("MedicalData", medicalSchema);