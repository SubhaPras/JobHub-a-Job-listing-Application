import multer from "multer";
import  CloudinaryStorage  from "multer-storage-cloudinary";
import cloudinary from "../Utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "resumes",
    resource_type: "raw",
    public_id: Date.now() + "-" + file.originalname.replace(/\s+/g, "-"),
  }),
});

const fileFilter = (req, file, cb) => {
  const allowed = /pdf|doc|docx/;

  if (allowed.test(file.mimetype) || allowed.test(file.originalname)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
