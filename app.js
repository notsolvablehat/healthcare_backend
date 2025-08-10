const express = require("express");
const dotenv = require("dotenv");
dotenv.config()
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db.config");
const LLMRoute = require("./routes/gemini.routes");

const app = express();
dbConnect();

app.use(express.json({ limit: "50mb" }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser())
app.use("/user", userRoutes);
app.use("/llm", LLMRoute);

app.listen(3000, () => console.log("Server active on http://localhost:3000"))
