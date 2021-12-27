const Joi = require('Joi');
const mongoose = require('mongoose');

const Headmaster_Schema = new mongoose.Schema({
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
    role:{
        type:String,
        required:true
    },
});

const Headmaster=new mongoose.model('Headmaster',Headmaster_Schema);


function  validateHeadmaster(head) {
    const schema=Joi.object({
    name:Joi.string().min(8).max(50).required(),
    email:Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(8).max(1024).required()
    });
    return schema.validate(head);    
    }

exports.Headmaster=Headmaster;
exports.validateHeadmaster=validateHeadmaster;