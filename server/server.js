const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
const fanRoutes = require("./routes/fanRoutes");
const messageRoutes = require("./routes/messageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const PORT = process.env.PORT || 5000;
const publicEnquiryRoutes = require("./routes/publicEnquiryRoute");

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(function (req, res, next) {
  console.log("Incoming request:", req.method, req.url);
  next();
});
app.use("/api/fans", fanRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public-enquiries", publicEnquiryRoutes);

app.get("/", function (req, res) {
  res.send("Aaron Pierre Backend Is Running!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, function () {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(function (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
