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

router.get("/search", authentication, searchUser);
router.get("/", authentication, getAllUsers);
router.get("/:id", authentication, getUserById);
router.post("/", authentication, authorization("Admin"), addUser);
router.put("/:id", authentication, updateUser);
router.delete(
  "/:id",
  authentication,
  authorization("Admin"),
  deleteUser
);

export default router;
