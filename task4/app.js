import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/connection.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
connectDB();
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});