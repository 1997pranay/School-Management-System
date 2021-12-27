require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateTeacher(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const decoded = jwt.verify(token, process.env.API_KEY);
        req.user = decoded;
        // console.log(decoded);
        if (req.user.role == 'Teacher')
            next();
    }
    catch (ex) {
        return res.status(400).send('Invalid token');
    }
}

function authenticateHeadmaster(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const decoded = jwt.verify(token, process.env.API_KEY);
        req.user = decoded;
        if (decoded.role == 'headmaster')
            next();
    }
    catch (ex) {
        return res.status(400).send('Invalid token');
    }
}

function authenticateStudent(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const decoded = jwt.verify(token, process.env.API_KEY);
        req.user = decoded;
        if (decoded.role == 'Student')
            next();
    }
    catch (ex) {
        return res.status(400).send('Invalid token');
    }
}

exports.authenticateHeadmaster = authenticateHeadmaster;
exports.authenticateStudent = authenticateStudent;
exports.authenticateTeacher = authenticateTeacher;



