import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resumes", 
    resource_type: "auto",
    allowed_formats: ["pdf", "doc", "docx"],
    resource_type: "auto",
    public_id: (req, file) => Date.now() + "-" + file.originalname.replace(/\s+/g, "-"),
  },
});

const fileFilter = (req, file, cb) => {
  if (/pdf|doc|docx/.test(file.mimetype) || /\.(pdf|doc|docx)$/i.test(file.originalname)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF/DOC/DOCX files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
