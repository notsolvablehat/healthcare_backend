const schema = {
  "responseMimeType": "application/json",
  "responseSchema": {
    "type": "OBJECT",
    "description": "A structured representation of a patient's medical report.",
    "properties": {
      "firstName": {
        "type": "STRING",
        "description": "Patient's first name.",
        "default": ""
      },
      "lastName": {
        "type": "STRING",
        "description": "Patient's last name.",
        "default": ""
      },
      "dateOfBirth": {
        "type": "STRING",
        "description": "Patient's date of birth, preferably in MM-DD-YYYY format.",
        "default": ""
      },
      "gender": {
        "type": "STRING",
        "description": "Patient's gender.",
        "enum": ["male", "female", "other", "NA"],
        "default": ""
      },
      "patientId": {
        "type": "STRING",
        "description": "A unique patient identifier from the report (e.g., Patient ID No, NRIC, etc.).",
        "default": ""
      },
      "reportDate": {
        "type": "STRING",
        "description": "The date the report was generated or signed, preferably in YYYY-MM-DD format.",
        "default": ""
      },
      "physicianName": {
        "type": "STRING",
        "description": "The name of the attending or reporting physician.",
        "default": ""
      },
      "clinicName": {
        "type": "STRING",
        "description": "The name of the hospital, clinic, or laboratory.",
        "default": ""
      },
      "medicalProfile": {
        "type": "OBJECT",
        "description": "A comprehensive collection of the patient's medical information.",
        "properties": {
          "allergies": {
            "type": "ARRAY",
            "description": "List of patient's known allergies.",
            "default": [],
            "items": {
              "type": "OBJECT",
              "properties": {
                "name": { "type": "STRING", "default": "NA" },
                "severity": { "type": "STRING", "default": "NA" },
                "reaction": { "type": "STRING", "default": "NA" }
              }
            }
          },
          "chronicConditions": {
            "type": "ARRAY",
            "description": "List of patient's chronic conditions.",
            "default": [],
            "items": {
              "type": "OBJECT",
              "properties": {
                "name": { "type": "STRING", "default": "NA" },
                "diagnosedDate": { "type": "STRING", "default": "NA" },
                "status": { "type": "STRING", "default": "NA" }
              }
            }
          },
          "medications": {
            "type": "ARRAY",
            "description": "List of medications the patient is taking.",
            "default": [],
            "items": {
              "type": "OBJECT",
              "properties": {
                "name": { "type": "STRING", "default": "NA" },
                "dosage": { "type": "STRING", "default": "NA" },
                "frequency": { "type": "STRING", "default": "NA" },
                "purpose": { "type": "STRING", "default": "NA" }
              }
            }
          },
          "familyHistory": {
            "type": "ARRAY",
            "description": "List of relevant family medical history.",
            "default": [],
            "items": {
              "type": "OBJECT",
              "properties": {
                "condition": { "type": "STRING", "default": "NA" },
                "relation": { "type": "STRING", "default": "NA" }
              }
            }
          },
          "labResults": {
            "type": "ARRAY",
            "description": "An array of structured laboratory test results from the report.",
            "default": [],
            "items": {
              "type": "OBJECT",
              "properties": {
                "testName": { "type": "STRING", "description": "The name of the test (e.g., 'Glucose', 'HDL Cholesterol')." },
                "value": { "type": "STRING", "description": "The resulting value of the test." },
                "unit": { "type": "STRING", "description": "The unit of measurement (e.g., 'mg/dl', '%')." },
                "referenceRange": { "type": "STRING", "description": "The normal or reference range for the test." },
                "flag": { "type": "STRING", "description": "An indicator for the result's status.", "enum": ["High", "Low", "Normal", "NA"] }
              }
            }
          },
          "clinicalSummary": {
            "type": "OBJECT",
            "description": "A summary of narrative clinical information from the report.",
            "properties": {
              "diagnosis": {
                "type": "ARRAY",
                "description": "A list of final diagnoses mentioned in the report.",
                "default": [],
                "items": { "type": "STRING" }
              },
              "clinicalHistory": {
                "type": "STRING",
                "description": "A summary of the patient's clinical history.",
                "default": ""
              },
              "examinationFindings": {
                "type": "STRING",
                "description": "A summary of the physical and/or mental examination findings.",
                "default": ""
              },
              "prognosis": {
                "type": "STRING",
                "description": "The stated prognosis or likely course of the condition.",
                "default": ""
              }
            }
          }
        }
      }
    }
  }
}

module.exports = schema;