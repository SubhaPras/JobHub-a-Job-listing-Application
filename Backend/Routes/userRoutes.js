import express from "express";
import { getUser, updateUser } from "../Controllers/userController.js";
import {protect} from "../Middlewares/authMiddleware.js"
import upload from "../Middlewares/uploadMiddleware.js"

const router = express.Router();

router.get("/:id", getUser);
router.put("/:id",protect , upload.single('resume'), updateUser );

export default router