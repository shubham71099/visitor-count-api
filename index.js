const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ORIGINS.split(" "),
  })
);

mongoose.connect(process.env.DATABASE_URL);

const visitorSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

const Visitor = mongoose.model("Visitor", visitorSchema);

app.post("/visitCount", async function (req, res) {
  try {
    let visitors = await Visitor.findOne({ name: "portfolio" });
    visitors.count += 1;
    visitors.save();
    res.status(200).json({ visitCount: visitors.count, success: true });
  } catch {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

app.listen(3000, function (req, res) {
  console.log("listening to server 3000");
});
