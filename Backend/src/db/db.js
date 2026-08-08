const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/iZest";


function connectDB() {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB initial connection error:", err.message);
      process.exit(1);
    });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB runtime error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected. Trying to reconnect...");
  });
}

module.exports = connectDB;
