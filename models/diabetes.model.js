const diabetesSchema = {
  "responseMimeType": "application/json",
  "responseSchema": {
    "type": "OBJECT",
    "description": "A comprehensive schema for storing and managing a diabetes patient's health data, designed for AI-driven data extraction from clinical reports.",
    "properties": {
      "patientInfo": {
        "type": "OBJECT",
        "description": "Basic demographic and administrative information about the patient.",
        "properties": {
          "patientId": { "type": "STRING", "description": "Unique identifier for the patient." },
          "fullName": { "type": "STRING" },
          "dateOfBirth": { "type": "STRING", "description": "Date in YYYY-MM-DD format." },
          "age": { "type": "INTEGER" },
          "gender": { "type": "STRING", "enum": ["Male", "Female", "Other"] },
          "contact": {
            "type": "OBJECT",
            "properties": {
              "phone": { "type": "STRING" },
              "email": { "type": "STRING" }
            }
          }
        }
      },
      "clinicalSummary": {
        "type": "OBJECT",
        "description": "An overview of the patient's diabetic condition and related history.",
        "properties": {
          "diabetesType": { "type": "STRING", "enum": ["Type 1", "Type 2", "Gestational", "Undefined"] },
          "diagnosisDate": { "type": "STRING", "description": "Date in YYYY-MM-DD format." },
          "comorbidities": {
            "type": "ARRAY",
            "description": "List of other significant health conditions, e.g., 'Hypertension', 'Hyperlipidemia'.",
            "items": { "type": "STRING" }
          },
          "familyHistory": { "type": "STRING", "description": "Notes on family history of diabetes or related conditions." }
        }
      },
      "healthMetrics": {
        "type": "OBJECT",
        "description": "Time-series data for key health indicators.",
        "properties": {
          "bloodGlucose": {
            "type": "ARRAY",
            "items": {
              "type": "OBJECT",
              "properties": {
                "timestamp": { "type": "STRING", "description": "Timestamp in ISO 8601 format." },
                "value": { "type": "NUMBER", "description": "in mg/dL" },
                "context": { "type": "STRING", "description": "e.g., 'Fasting', 'Post-Meal'" }
              }
            }
          },
          "hba1c": {
            "type": "ARRAY",
            "items": {
              "type": "OBJECT",
              "properties": {
                "date": { "type": "STRING", "description": "Date in YYYY-MM-DD format." },
                "value": { "type": "NUMBER", "description": "as a percentage" }
              }
            }
          },
          "bloodPressure": {
            "type": "ARRAY",
            "items": {
              "type": "OBJECT",
              "properties": {
                "timestamp": { "type": "STRING", "description": "Timestamp in ISO 8601 format." },
                "systolic": { "type": "INTEGER" },
                "diastolic": { "type": "INTEGER" }
              }
            }
          },
          "lipidProfile": {
            "type": "ARRAY",
            "items": {
              "type": "OBJECT",
              "properties": {
                "date": { "type": "STRING", "description": "Date in YYYY-MM-DD format." },
                "totalCholesterol": { "type": "NUMBER", "description": "in mg/dL" },
                "triglycerides": { "type": "NUMBER", "description": "in mg/dL" },
                "hdl": { "type": "NUMBER", "description": "in mg/dL" },
                "ldl": { "type": "NUMBER", "description": "in mg/dL" }
              }
            }
          },
          "bmi": {
            "type": "ARRAY",
            "items": {
              "type": "OBJECT",
              "properties": {
                "date": { "type": "STRING", "description": "Date in YYYY-MM-DD format." },
                "value": { "type": "NUMBER" }
              }
            }
          }
        }
      },
      "medications": {
        "type": "ARRAY",
        "description": "List of current and past medications.",
        "items": {
          "type": "OBJECT",
          "properties": {
            "name": { "type": "STRING" },
            "dosage": { "type": "STRING" },
            "frequency": { "type": "STRING" },
            "status": { "type": "STRING", "enum": ["Active", "Inactive"] }
          }
        }
      },
      "lifestyle": {
        "type": "OBJECT",
        "description": "Tracking of lifestyle factors like diet and exercise.",
        "properties": {
          "exercise": {
            "type": "ARRAY",
            "items": {
              "type": "OBJECT",
              "properties": {
                "date": { "type": "STRING", "description": "Date in YYYY-MM-DD format." },
                "activity": { "type": "STRING" },
                "durationMinutes": { "type": "INTEGER" }
              }
            }
          },
          "dailyNutrition": {
            "type": "ARRAY",
            "items": {
              "type": "OBJECT",
              "properties": {
                "date": { "type": "STRING", "description": "Date in YYYY-MM-DD format." },
                "carbohydratesGrams": { "type": "INTEGER" },
                "calories": { "type": "INTEGER" },
                "fiberGrams": { "type": "INTEGER" }
              }
            }
          }
        }
      },
      "achievements": {
        "type": "ARRAY",
        "description": "Milestones and streaks for patient engagement.",
        "items": {
          "type": "OBJECT",
          "properties": {
            "achievementId": { "type": "STRING" },
            "title": { "type": "STRING" },
            "description": { "type": "STRING" },
            "dateAchieved": { "type": "STRING", "description": "Date in YYYY-MM-DD format." }
          }
        }
      },
      "medicalDocuments": {
        "type": "ARRAY",
        "description": "Summaries and metadata for uploaded reports.",
        "items": {
          "type": "OBJECT",
          "properties": {
            "documentId": { "type": "STRING" },
            "title": { "type": "STRING" },
            "date": { "type": "STRING", "description": "Date in YYYY-MM-DD format." },
            "summary": { "type": "STRING", "description": "An AI-generated summary of the document." }
          }
        }
      }
    }
  }
};

module.exports = diabetesSchema;
