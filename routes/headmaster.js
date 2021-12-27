const express=require('express');
const { authenticateHeadmaster } = require('../middlewares/auth');
const router=express.Router();
const {updateHeadmaster}=require('../controllers/Headmaster_controller');
const { getStudents, getStudentsById, addStudent, deleteStudent } = require('../controllers/student_controller');
const { getTeacher, getTeachersById, addTeacher } = require('../controllers/teacher_controller');

//headmaster routes
router.put('/update',authenticateHeadmaster,updateHeadmaster);

//headmaster student routes
router.get('/students',authenticateHeadmaster,getStudents); //done
router.get('/students/:rollno',authenticateHeadmaster,getStudentsById); //done
router.delete('/students/:rollno',authenticateHeadmaster,deleteStudent);//done

//headmaster teacher routes
router.get('/teachers',authenticateHeadmaster,getTeacher); //done
router.get('/teachers/:staffno',authenticateHeadmaster,getTeachersById);  //done
router.post('/teachers/:staffno',authenticateHeadmaster,addTeacher); //done


module.exports=router;


