const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs")
const schema = require("../models/llm.model")
const medicalDataModel = require("../models/medicalData.model");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const allowedTypes = [
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Invalid file type"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

route.post("/acc-info", authMiddleware, async (req, res) => {
  const settings = req.body;

  if (!settings || !settings.profileVisibility || !settings.dataSharing) {
    return res
      .status(400)
      .json({ message: "Missing required settings information." });
  }

  const prompt = `
    Explain the following privacy settings for a user of a medical application in simple, easy-to-understand terms.
    Keep the explanation concise and clear. Format the output using <h3> for headings and <span> and <br/>. Do not use anything else.

    - **Profile Visibility**: Currently set to "${settings.profileVisibility}".
    - **Data Sharing**: Currently set to "${settings.dataSharing}".
    - **Research Participation**: Currently set to "${
      settings.researchParticipation ? "Enabled" : "Disabled"
    }".
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
    console.log(response.candidates[0].content.parts[0].text)
    const explanation = response.candidates[0].content.parts[0].text;

    if (!explanation) {
      return res
        .status(500)
        .json({ message: "Failed to generate explanation from AI service." });
    }

    res.status(200).json({ message: "Success", data: explanation });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res
      .status(500)
      .json({ message: "An error occurred while contacting the AI service." });
  }
});

route.post(
  "/upload",
  [authMiddleware, upload.single("user-file")],
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      console.log("File from frontend",req.file)
      const filePath = req.file.path;
      const mimeType = req.file.mimetype;
      const contents = [
          { text: "Extract Information From this document" },
          {
              inlineData: {
                  mimeType: mimeType,
                  data: Buffer.from(fs.readFileSync(filePath)).toString("base64")
              }
          }
      ];
      const myfile = await ai.files.upload({
        file: filePath,
        mimeType: mimeType,
        displayName: req.file.originalname,
      });

      console.log("Uploaded file details:", myfile);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: schema
      });

      const incomingData = JSON.parse(response.text);

      console.log("Model response", incomingData);

      const existingMedicalData = await medicalDataModel.findOne({
        emailId: req.body.emailId,
        reportName: req.file.filename,
      });

      let finalMedicalData;
      if (existingMedicalData) {
        console.log("Existing report found. Updating...");
        const updatedData = {
          ...incomingData,
          lastUpdated: Date.now(),
        };
        finalMedicalData = await medicalDataModel.findByIdAndUpdate(
          existingMedicalData._id,
          updatedData,
          { new: true }
        );
      } else {
        console.log("No existing report found. Creating new one...");
        finalMedicalData = await medicalDataModel.create({
          ...incomingData,
          reportName: req.file.filename,
          emailId: req.body.emailId,
          lastUpdated: Date.now(),
        });
      }

      console.log("Final Medical Data", finalMedicalData);

      res.status(200).json({ message: "Success", data: finalMedicalData });
    } catch (error) {
      console.error("Error during file upload and processing:", error);
      res.status(500).json({ message: "An error occurred." });
    }
  }
);

module.exports = route;
