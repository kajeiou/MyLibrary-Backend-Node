
const User = require("../models/User.js")
const createError = require('http-errors');
const pwRules = require('../security/password')
const { Validator } = require("node-input-validator");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

exports.register = (req, res, next) => {
    console.log('register')

    const validInput = new Validator(req.body, {
        email: 'required|email|length:100',
        password:'required'
    })
    validInput.check()
    .then((matched) => {
        
        if(!matched) {
            console.log(error)
            createError(404, 'Error' + error);
        }
        else {
            if(pwRules.validate(req.body.password)) {
                
                bcrypt.hash(req.body.password,10) 
                .then(hash => {
                    const newId = new mongoose.Types.ObjectId();
                    
                    const user = new User({
                        id: newId,
                        userName: req.body.userName,
                        email: req.body.email,
                        password: hash,
                        isAdmin:false

                    })
                    user.save()
                    .then(() => res.send(user))
                    .catch(error =>  console.log("error register"+error));
                })
            }
            else {
                console.log("Invalid password")
                throw 'Invalid password'
            }
        }
    })
    .catch(error =>  createError(404, 'Error' + error));
}

exports.login = async(req, res, next) => {
    console.log('login')
    const email = req.body.email
    bcrypt.hash(req.body.password,10)
    
    .catch(error =>  console.log(error))
    //const password = req.body.password
    console.log (email)
    console.log(password)
    try {
        const user = await User.findOne({'email': email, 'password': password})
        if(!user) {
            console.log('User email '+ email + ' not founded.')
            throw createError(404, 'User email '+ email + ' not founded.');
        }
        res.send(user)
    }
    catch(error) {
        console.log(error)
        createError(404, 'Error' + error)
    }
}
exports.getUser = async (req, res, next) => {
    console.log('getUser')
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if(!user) {
            console.log('User id '+ id + ' not founded.')
            throw createError(404, 'User id '+ id + ' not founded.');
        }
        res.send(user)
    } catch(error) {
        console.log(error)
        createError(404, 'Error' + error)
    }
}
exports.deleteUser = async(req, res, next) => {
    console.log('deleteUser')
    const id = req.params.id
    try {
        const delUser = await User.deleteOne({_id : id})
    }
    catch(error) {
        console.log(error)
        createError(404, 'Error' + error)
    }
}
