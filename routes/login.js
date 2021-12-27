const express=require('express');
const mongoose = require('mongoose');
const router=express.Router();
const {headmasterLogin,teacherLogin,studentLogin}=require('../controllers/login');

router.post('/headmaster',headmasterLogin);
router.post('/teacher',teacherLogin);
router.post('/student',studentLogin);

module.exports=router;