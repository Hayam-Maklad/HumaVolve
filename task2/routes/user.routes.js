import express from "express";
import { addUser,getAllUsers, getUserById ,updateUser,deleteUser} from "../controller/user.controller.js";

const router = express.Router();

router.post("/users", addUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
export default router;