import express from "express";
import {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
} from "../controller/user.controller.js";

import { authentication } from "../middlewares/auth.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";

const router = express.Router();

// Search
router.get("/search", authentication, searchUser);

// Get All Users
router.get("/", authentication, getAllUsers);

// Get User By ID
router.get("/:id", authentication, getUserById);

// Create User (Admin only)
router.post("/", authentication, authorization("Admin"), addUser);

// Update User
router.put("/:id", authentication, updateUser);

// Delete User (Admin only)
router.delete(
  "/:id",
  authentication,
  authorization("Admin"),
  deleteUser
);

export default router;