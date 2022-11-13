
const User = require("../models/User.js")
const createError = require('http-errors');
const pwRules = require('../security/password')
const { Validator } = require("node-input-validator");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        if(!users) {
            res.status(404).send('Error users not founded' + error);
        }
        res.send(users)
    } catch(error) {
        res.status(404).send('Error users not founded' + error);
    }
}

exports.register = (req, res, next) => {
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
            // Si format de mot de passe est valide
                // Mini = 6 ; Max = 16 ; 1 uppercase ; letters ; 1 number ; no space ; not Passw0rd, Azerty123, Password123 
            if(pwRules.validate(req.body.password)) {
                // Hashage du mot de passe
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
                    // Sauvegarde bdd
                    user.save()
                    .then(() => res.send(user))
                    .catch(error =>   res.status(404).send('Error register '+ error));
                })
            }
            // Si format de mot de passe invalide
            else {
                res.status(404).send('Invalid format password')
            }
        }
    })
    .catch(error =>  res.status(404).send('Email or password required '+ error));
}

exports.login = async(req, res, next) => {
    const email = req.body.email
    // Recherche de l'utilisateur par adresse mail
    User.findOne({'email': email})
    .then(user =>{
        // Si user trouvé
        if(user!=null) {
            // Comparaison mot de passe entré et mot de passe crypté dans la base
            bcrypt.compare(req.body.password,user.password)
            .then( valid => {
                if(valid == false) {
                    res.status(404).send('Email or password invalid');
                }
                // Si les identifiants sont bon
                // Envoie du token
                else {
                    res.send({ 
                        userId: user._id, 
                        token: jwt.sign(
                            { 
                                userId: user._id, 
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
    const id = req.params.id
    try {
        // Recherche de l'utilisateur
        const user = await User.findById(id)
        if(!user) {
            res.status(404).send('User id '+ id + ' not founded');
        }
        res.send(user)
    } catch(error) {
        res.status(404).send('User id '+ id + ' invalid');
    }
}

exports.updateUser =  async(req, res, next) => {
    const id = req.params.id
    try {
        // Recherche de l'utilisateur et mise à jour
        const user = await User.findByIdAndUpdate(id, 
            {
                email: req.body.bookName,
                isAdmin: req.body.isAdmin,
            })
            res.send("User id " + id + " updated")
    }
    catch(error) {
        res.status(404).send('Error' + error)
    }
}

exports.deleteUser = async(req, res, next) => {
    const id = req.params.id
    try {
        // Suppression de l'utilisateur
        const delUser = await User.deleteOne({_id : id})
        res.send("User id "+ id+ "deleted")
    }
    catch(error) {
        res.status(404).send('Error' + error);
    }
}
