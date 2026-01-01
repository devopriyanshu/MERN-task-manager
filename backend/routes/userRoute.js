import express from "express";
import { getAllUsers, deleteUser } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

export default router;
