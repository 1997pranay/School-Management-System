const Joi = require('joi');
const mongoose = require('mongoose');
const { Teacher_Schema } = require('./Teacher');


const Student_Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 8,
            maxlength: 50
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024

        },
        role: {
            type: String,
            required: true
        },
        class: {
            type: String,
            required: true
        },
        rollno: {
            type: Number,
            required: true,
        }
    });

const Student = new mongoose.model('Student', Student_Schema);

function validateStudent(stud) {
    const schema = Joi.object({
        name: Joi.string().min(8).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
        role:Joi.string(),
        class:Joi.string(),
        rollno:Joi.number()
    });
    return schema.validate(stud);
}

exports.Student = Student;
exports.validateStudent = validateStudent;