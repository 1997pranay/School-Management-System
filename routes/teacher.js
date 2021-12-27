const express=require('express');
const router=express.Router();

const {
    getTeacher,
    getTeachersById,
    updateTeacherById,
}=require("../controllers/teacher_controller");

const{
getStudentsById,
addStudent,
deleteStudent,
}=require('../controllers/student_controller');

const {authenticateTeacher}=require("../middlewares/auth");

//teacher routes
router.get("/",authenticateTeacher,getTeacher);  //done

router.get("/:staffno",authenticateTeacher,getTeachersById);//done

router.put("/:staffno",authenticateTeacher,updateTeacherById);//done




//teacher student routes


router.get("/students/:rollno",authenticateTeacher,getStudentsById);//done

router.post("/students/:rollno",authenticateTeacher,addStudent);//done

router.delete("/students/:rollno",authenticateTeacher,deleteStudent);//done




module.exports=router;

