const express=require('express');
const router=express.Router();

const {
    getStudents,
    getStudentsById,
    updateStudent
}=require("../controllers/student_controller");

const {authenticateStudent}=require("../middlewares/auth");


router.get("/",authenticateStudent, getStudents); //done
router.get("/:rollno",authenticateStudent, getStudentsById); //done
router.put("/:rollno",authenticateStudent, updateStudent); //done


module.exports=router;

