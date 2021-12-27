const mongoose=require('mongoose');
const Joi=require('Joi');
const bcrypt=require("bcrypt");
const {Teacher,validateTeacher}=require('../models/Teacher');
const {Student}=require('../models/Student');

//Only headmaster can add or delete teachers

async function addTeacher(req, res) {
    try {
        const { error } = validateTeacher(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let teach = await Teacher.findOne({ staffno: req.body.staffno });
        if (teach) return res.status(400).send('Teacher already registered');
        teach = new Teacher(req.body);
        const salt = await bcrypt.genSalt(10);
        teach.password = await bcrypt.hash(teach.password,salt);
        await teach.save();
        res.status(200).json({ Success: true, Message: "Your teacher has been created" });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Success: false, Message: err.message });
    }
}


async function getTeacher(req, res) {
    try {
        const result = await Teacher.find().sort({ name: 1 });
        return res.json(result); 
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Success: false, Message: err.message });
    }
}

async function getTeachersById(req, res) {
    try {
        const teach =await Teacher.findOne({staffno:req.params.staffno});
        console.log(teach);
        if (!teach) {
            return res.status(404).send('Teacher not found');
        }
            return res.json(teach);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Success: false, Message: err.message });
    }
}

async function updateTeacherById(req, res, next) {
    try {
        const { error } = validateTeacher(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const result = await Teacher.update({ staffno:parseInt(req.params.staffno) }, {
            $set: {
                name: req.body.name,
                email: req.body.email
            }
        });
        res.json({ Success: true, Message: "Your Teacher has been updated" });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Success: false, Message: err.message });
      
    }
}


exports.addTeacher=addTeacher;
exports.getTeacher=getTeacher;
exports.getTeachersById=getTeachersById;
exports.updateTeacherById=updateTeacherById;



