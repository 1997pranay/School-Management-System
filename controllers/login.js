const mongoose = require('mongoose');
const Joi = require('Joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Headmaster } = require("../models/Headmaster");
const { Teacher } = require("../models/Teacher");
const { Student } = require("../models/Student");
require('dotenv').config();
module.exports.headmasterLogin = async function (req, res) {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let head = await Headmaster.findOne({ email: req.body.email });
    if (!head) { return res.status(400).send('Invalid email or password'); }
    const token = jwt.sign({ _id: head.id, role: head.role }, process.env.API_KEY);
    return res.header('x-auth-token', token).send('HeadMaster logged in successfully');
}

module.exports.teacherLogin = async function (req, res) {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let teach = await Teacher.findOne({ email: req.body.email });
    if (!teach) return res.status(400).send('Invalid email or password');
    const validPassword = await bcrypt.compare(req.body.password, teach.password)
    if (!validPassword) return res.status(400).send('Invalid username or password');
    const token = jwt.sign({ _id: teach.id, role: teach.role, class: teach.class, staffno: teach.staffno }, process.env.API_KEY);
    return res.header('x-auth-token', token).send('Teacher logged in successfully');
}

module.exports.studentLogin = async function (req, res) {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let stud = await Student.findOne({ email: req.body.email });
    if (!stud) return res.status(400).send('Invalid email or password');
    const token = jwt.sign({ _id: stud.id, role: stud.role, class: stud.class }, process.env.API_KEY);
    return res.header('x-auth-token', token).send('Student logged in successfully');
}


function validateLogin(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required()
    });
    return schema.validate(user);
}

