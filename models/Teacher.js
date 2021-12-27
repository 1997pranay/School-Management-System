const Joi = require('Joi');
const mongoose = require('mongoose');



const Teacher_Schema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50,
        unique: true
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
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }],
    staffno: {
        type: Number,
        required: true,
        unique: true
    },
    class: {
        type: String,
        required: true
    }
});

const Teacher = new mongoose.model('Teacher', Teacher_Schema);


function validateTeacher(teach) {
    const schema = Joi.object({
        name: Joi.string().min(8).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
        role:Joi.string(),
        students:Joi.array(),
        staffno:Joi.number(),
        class:Joi.string()
    });
    return schema.validate(teach);
}



exports.Teacher = Teacher;
exports.validateTeacher = validateTeacher;