const express=require('express');
const app=express();
const mongoose=require('mongoose');
const login=require('./routes/login');
const headmaster=require('./routes/headmaster');
const teacher=require('./routes/teacher');
const students=require('./routes/students');

//database connection
mongoose.connect('mongodb://localhost/School')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


app.use(express.json());
//routes  
app.use('/login',login);
app.use('/students',students);
app.use('/teachers',teacher);
app.use('/headmaster',headmaster);

app.listen(3000,()=>{console.log('Connected..........');});