require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Negozio API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});