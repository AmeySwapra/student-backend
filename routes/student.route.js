import express from "express";
import { createStudent, deleteStudent, getStudent, updateStudent } from "../controllers/student.controller.js";

const router = express.Router();


router.post('/create-student', createStudent);
router.put('/edit-student/:id', updateStudent);
router.delete('/delete-student/:id', deleteStudent);
router.get('/get-students', getStudent);


export default router;