const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const route = express.Router();

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


route.get("/", (req, res) => {
  res.status(200).json({ message: "200 Ok" });
  console.log("OK '/'");
});

route.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password -__v");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("GET user error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


route.post(
  "/onboarding",
  [
    body("emailId", "Email must be at least 6 characters").trim().isLength({ min: 6 }),
    body("password", "Password must be at least 8 characters").trim().isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid Data", data: errors.array() });
    }

    const {
      emailId,
      password,
      firstName,
      lastName,
      userType,
      certificatePath,
      specialization,
      termsAccepted,
    } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Creating User in Database");
      console.log(req.body);
      const user = await userModel.create({
        emailId,
        password: hashedPassword,
        firstName,
        lastName,
        userType,
        certificatePath,
        termsAccepted,
        specialization,
      });

      console.log("Successfully created user");
      res.status(201).json({
        message: "User created successfully",
      });
    } catch (error) {
      console.error("Onboarding Error:", error);
      
      if (error.code === 11000) {
        return res.status(409).json({
            message: "An account with this email already exists.",
        });
      }

      res.status(500).json({
        message: "Failed to create user due to an internal error.",
      });
    }
  }
);

route.post(
  "/login",
  [
    body("emailId", "Invalid email format").trim().isEmail(),
    body("password", "Password cannot be empty").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid data provided",
        data: errors.array(),
      });
    }

    const { emailId } = req.body;

    try {
      console.log("Looking for user in database");
      const user = await userModel.findOne({ emailId: emailId });
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user._id, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      console.log("Successfully Logged In");

      const { password, __v, ...safeUser } = user.toObject();
      console.log(safeUser);

      res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          maxAge: 60 * 60 * 1000
        })
        .status(200)
        .json({ message: "Login Success", data: safeUser });


    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "An internal server error occurred." });
    }
  }
);

route.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax"
    })
    .status(200)
    .json({ message: "Logged out successfully" });
});

module.exports = route;
