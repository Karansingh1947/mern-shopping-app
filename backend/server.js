require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const productRoutes = require("./routes/product.routes");


const app = express();
// temp file need to delete
app.get("/test", (req, res) => {
  res.json({ message: "test working" });
});

app.get("/health", (req, res) => {
  res.json({ status: "server is alive" });
});
//till here

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use("/api/products", productRoutes);

// IMPORTANT: Connect auth routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => {
  console.error("MongoDB connection failed:", err.message);
  process.exit(1);
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running', time: new Date() });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
