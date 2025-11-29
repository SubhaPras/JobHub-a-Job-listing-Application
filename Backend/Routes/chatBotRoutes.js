import express from "express";
import { chatBotController } from "../Controllers/chatBotController.js";
const router = express.Router()

router.post('/chat', chatBotController)

export default router