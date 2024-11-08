import express from "express";
import { createStudent, deleteStudent, getStudent, updateStudent } from "../controllers/student.controller.js";
import multer from 'multer';
const router = express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
  
  
  const upload = multer({ storage });

router.post('/create-student', upload.fields([{ name: 'image' }, { name: 'pdf' }]), createStudent);
router.put('/edit-student/:id',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), updateStudent);
router.delete('/delete-student/:id', deleteStudent);
router.get('/get-students', getStudent);

export default router;
