require('dotenv').config()
const express = require('express');
const { body, validationResult } = require('express-validator');
const Users = require('../model/user.model');
var jwt = require('jsonwebtoken');

const newToken = (user) => {
    return jwt.sign({user},"3f68e07d4d6a4d168f94163122de0be6dcb683137aa5cb03519a14b347ca14c8f5f9b77ab542680697ea1b085b96de0ede3ecf3a843b94ccac21f662d7b43f2a")
}

const Register = async (req, res) => {
    try {
        console.log(req.body)
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.send({ errors: errors.array() });
        }

        let user = await Users.findOne({email: req.body.email}).lean().exec();

        if(user) {
            return res.send('User already exists')
        }
        user = await Users.create(req.body)
        return res.send(user)
    } catch(err) {
        return res.send(err.message)
    }
}

const Login = async(req, res) => {
    try {
        let user = await Users.findOne({email: req.body.email});

        if(!user) 
        return res.send('Either email or password is incorrect');

        const match = user.checkPassword(req.body.password);
    if (!match) {
      return res.send("Either email or password is incorrect");
    }

    const Token = newToken(user);

    // res.cookie('token', Token, {
    //     expires: new Date(Date.now()+3000000),
    //     httpOnly: true
    // })
    
    return res.send({token: Token, id: user._id, account: user.account, name: user.first_name})

    } catch(err) {
        return res.send(err.message)
    }
}

module.exports = { Register, Login }

