const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const fanRoutes = require("./routes/fanRoutes");
const messageRoutes = require("./routes/messageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const publicEnquiryRoutes = require("./routes/publicEnquiryRoute");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.use(function (req, res, next) {
  console.log("Incoming request:", req.method, req.url);
  next();
});

let mongoConnectionPromise;

function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }

  if (!process.env.MONGODB_URI) {
    return Promise.reject(new Error("MONGODB_URI is not configured."));
  }

  if (!mongoConnectionPromise) {
    mongoConnectionPromise = mongoose
      .connect(process.env.MONGODB_URI)
      .catch(function (error) {
        mongoConnectionPromise = null;
        throw error;
      });
  }

  return mongoConnectionPromise;
}

app.get("/", function (req, res) {
  res.send("Aaron Pierre Backend Is Running!");
});

app.use(function (req, res, next) {
  connectToDatabase()
    .then(function () {
      next();
    })
    .catch(function (error) {
      console.error("MongoDB connection error:", error.message);

      res.status(500).json({
        message: "Unable to connect to the database.",
      });
    });
});

app.use("/api/fans", fanRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public-enquiries", publicEnquiryRoutes);

if (process.env.VERCEL !== "1") {
  connectToDatabase()
    .then(function () {
      app.listen(PORT, function () {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(function (error) {
      console.error("MongoDB connection error:", error.message);
      process.exit(1);
    });
}

module.exports = app;

