import express from "express";
import { updateProfile } from "../controllers/userCtrl.js";
// ...existing code...

const router = express.Router();

// Định nghĩa endpoint cập nhật profile
router.patch("/profile/:id", updateProfile);

// ...existing code...

export default router;
