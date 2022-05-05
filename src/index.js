require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const { Register, Login } = require('./controller/auth.controller');
// const accountController = require('../src/controller/account.controller')

const { body, validationResult } = require('express-validator');

const connect = async () => {

    try {
        return mongoose.connect("mongodb+srv://Banko:banko@cluster0.cxzoh.mongodb.net/Banko?retryWrites=true&w=majority")
    } catch(err) {
        console.log('server Error')
    }
    
}


app.use(express.json());
app.use(cors({origin: true, credentials: true}));

// app.use('/account', accountController);

app.get('/', (req, res) => {
    res.send('This is blog backend server')
})

app.post('/register', body('first_name').isString().isLength({ min: 3 }),body('email').isEmail(),
body('password').custom((value) => {
    let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/
  
    if(pattern.test(value) !== true) {
        throw new Error('Password is not strong')
    } 

    return true;
}) ,Register);

app.post('/login', Login);

app.listen(process.env.PORT || 8080, async () => {
    try {
        connect();
        console.log('Listening 8080')
    } catch(err) {
        console.log(err.message)
    }
})