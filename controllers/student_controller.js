
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { Student, validateStudent } = require('../models/Student');
const { Teacher } = require('../models/Teacher');

async function addStudent(req, res) {
    try {
        const { error } = validateStudent(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let stud = await Student.findOne({ rollno: req.body.rollno, class: req.body.class });
        if (stud) return res.status(400).send('Student already registered');
        stud = new Student(req.body);
        await stud.save();
        await Teacher.findOneAndUpdate(
            { staffno: req.user.staffno, class: req.user.class },
            { $push: { students: { _id: stud._id } } },
            { new: true }
        );
        return res.status(200).json({ Success: true, Message: "Your student has been created" });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Success: false, Message: err.message });
    }
}


async function getStudents(req, res) {
    try {
        const students = await Student.find({});
        res.json(students);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Success: false, Message: err.message });
    }
}


async function getStudentsById(req, res) {
    try {
        const stud = await Student.find({ rollno: req.params.rollno });
        if (!stud) {
            return res.status(404).send('Student not found');
        }
        else {
            return res.json(stud);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ Success: false, Message: err.message });
    }
}

async function updateStudent(req, res) {
    try {
        const result = await Student.update({ rollno: req.params.rollno }, {
            $set: {
                name: req.body.name,
                email: req.body.email
            }
        });
        return res.json({ Success: true, Message: "Your student has been updated" });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ Success: false, Message: err.message });
    }
}

// Only teacher can delete students

async function deleteStudent(req, res) {
    try {
        const stud = await Student.findOne({ rollno: req.params.rollno });
        if (!stud) {
            return res.status(403).send('Invalid roll number or class');
        }
        await Student.deleteOne({ rollno: req.params.rollno });

        await Teacher.findOneAndUpdate(
            { staffno: req.user.staffno },
            { $pull: { students: {rollno:stud.rollno } } },
            { new: true }
        );
        return res.json({ Success: true, Message: `Your student with ${req.params.rollno} has been deleted` });

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ Success: false, Message: err.message });
    }
}

exports.addStudent = addStudent;
exports.getStudents = getStudents;
exports.getStudentsById = getStudentsById;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
