import express from "express";
import { isEmployer, protect } from "../Middlewares/authMiddleware.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobDetail,
  getmyjobs,
  updateJob,
} from "../Controllers/jobController.js";


const router = express.Router();

router.get("/getalljobs", getAllJobs)
router.get('/getmyjobs', protect, isEmployer, getmyjobs);
router.post("/createjob", protect, isEmployer, createJob);
router.get("/:id", getJobDetail);
router.put("/updatejob/:id", protect, isEmployer, updateJob);
router.delete("/:id", protect, isEmployer, deleteJob);


export default router;
