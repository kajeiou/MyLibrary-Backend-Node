
const User = require("../models/User.js")
const createError = require('http-errors');
const pwRules = require('../security/password')
const { Validator } = require("node-input-validator");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
    console.log('register')
    const validInput = new Validator(req.body, {
        email: 'required|email|length:100',
        password:'required'
    })
    validInput.check()
    .then((matched) => {
        if(!matched) {
            res.status(404).send('Email or password required '+ error)
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
                    .catch(error =>   res.status(404).send('Error register '+ error));
                })
            }
            else {
                res.status(404).send('Invalid format password')
            }
        }
    })
    .catch(error =>  res.status(404).send('Email or password required '+ error));
}

exports.login = async(req, res, next) => {
    console.log('login')
    const email = req.body.email
    User.findOne({'email': email})
    .then(user =>{
        if(user!=null) {
            bcrypt.compare(req.body.password,user.password)
            .then( valid => {
                if(valid == false) {
                    res.status(404).send('Email or password invalid');
                }
                else {
                    res.send({ 
                        userId: user.id, 
                        token: jwt.sign(
                            { 
                                userId: user.id, 
                                isAdmin: user.isAdmin 
                            },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                        isAdmin: user.isAdmin
                    })
                }
                
            })
            .catch(error =>  res.status(404).send('Login invalid'));
        }
        else {
            res.status(404).send('Email or password invalid');
        }
        
    })
    
}
exports.getUser = async (req, res, next) => {
    console.log('getUser')
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if(!user) {
            res.status(404).send('User id '+ id + ' not founded');
        }
        res.send(user)
    } catch(error) {
        res.status(404).send('User id '+ id + ' invalid');
    }
}
exports.deleteUser = async(req, res, next) => {
    console.log('deleteUser')
    const id = req.params.id
    try {
        const delUser = await User.deleteOne({_id : id})
        res.send("User id "+ id+ "deleted")
    }
    catch(error) {
        res.status(404).send('Error' + error);
    }
}
