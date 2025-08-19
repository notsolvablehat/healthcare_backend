const express = require("express");
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db.config");
const LLMRoute = require("./routes/gemini.routes");
const PORT = process.env.PORT || 3000;
const app = express();
dbConnect();

app.use(express.json({ limit: "50mb" }));
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://healthcare-frontend-lovat.vercel.app"
  ],
  credentials: true
}));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser())
app.use("/user", userRoutes);
app.use("/llm", LLMRoute);

app.listen(PORT, () => console.log("Server active on http://localhost:3000"))
