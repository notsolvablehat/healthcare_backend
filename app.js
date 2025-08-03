const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db.config");


const app = express();
dotenv.config()
dbConnect();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use("/user", userRoutes);

app.listen(3000, () => console.log("Server active on http://localhost:3000"))