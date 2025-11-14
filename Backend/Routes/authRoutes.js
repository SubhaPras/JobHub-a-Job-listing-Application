import express from "express";
import { getMe, login, logout, register } from "../Controllers/authController.js";
import {protect} from "../Middlewares/authMiddleware.js"

const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;