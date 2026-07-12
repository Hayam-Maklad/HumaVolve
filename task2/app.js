import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connection.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use(userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});