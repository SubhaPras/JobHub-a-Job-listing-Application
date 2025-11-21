import express from "express";
import { isAdmin, protect } from "../Middlewares/authMiddleware.js";
import { deleteJob, deleteMessage, deleteUser, getAdminStats, getAllMessages, getAllUsers, getEveryjobs, makeAdmin } from "../Controllers/adminControllers.js";

const router = express.Router()

router.get("/getallusers", protect, isAdmin, getAllUsers)
router.get("/geteveryjobs", protect, isAdmin, getEveryjobs)
router.get("/getallmessages", protect, isAdmin, getAllMessages)
router.get("/stats", protect, isAdmin, getAdminStats);
router.put("/makeadmin/:id", protect, isAdmin, makeAdmin)
router.delete("/deleteuser/:id", protect, isAdmin, deleteUser)
router.delete("/deletejob/:id", protect, isAdmin, deleteJob)
router.delete('/deletemessage/:id', protect, isAdmin, deleteMessage)
export default router;