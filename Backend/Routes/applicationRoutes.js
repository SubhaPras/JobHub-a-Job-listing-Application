import express from "express";
import {protect, isEmployer} from "../Middlewares/authMiddleware.js"
import upload from "../Middlewares/uploadMiddleware.js"
import { apply, getApplicants, getMyApplications, updateApplicationStatus } from "../Controllers/applicationControllers.js";

const router = express.Router()

router.post("/:jobId/apply",protect, upload.single('resume'), apply )
router.get("/getmyapplications", protect, getMyApplications)
router.get("/:jobId", protect, isEmployer, getApplicants)
router.put('/updatestatus/:id', protect, isEmployer, updateApplicationStatus)

export default router