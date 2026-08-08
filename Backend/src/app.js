const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodItemRoutes = require("./routes/foodItem.routes");
const foodPartnerProfile = require("./routes/food-partner.routes");
const cors = require('cors');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/food-items", foodItemRoutes);
app.use("/api/food-partner", foodPartnerProfile);

module.exports = app;