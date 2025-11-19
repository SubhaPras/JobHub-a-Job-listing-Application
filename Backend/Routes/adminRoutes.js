import express from "express";
import { isAdmin, protect } from "../Middlewares/authMiddleware.js";
import { deleteUser, getAllMessages, getAllUsers, getEveryjobs, makeAdmin } from "../Controllers/adminControllers.js";

const router = express.Router()

router.get("/getallusers", protect, isAdmin, getAllUsers)
router.get("/geteveryjobs", protect, isAdmin, getEveryjobs)
router.get("/getallmessages", protect, isAdmin, getAllMessages)
router.put("/makeadmin/:id", protect, isAdmin, makeAdmin)
router.delete("/deleteuser/:id", protect, isAdmin, deleteUser)
export default router;