const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router()
const userController = require('../controllers/UserController.js')

// Function vérification token
function secure(req,res, next) {
    try {
        console.log("secure")
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodeToken.userId;
        res.locals.userId = userId;
        next();
    } catch (error) {
        res.status(401).json({ error : error | 'Authentification failed !'});
    }
}

// Get all users with token
router.get("/", secure, userController.getAllUsers)

// Get a user
router.get("/:id", secure,  userController.getUser)

// Login user
router.post("/login", userController.login)

// Register user
router.post("/register", userController.register)

// Update a user with token
router.put("/:id", secure, userController.updateUser)

// Delete user with token
router.delete("/:id", secure, userController.deleteUser)

module.exports = router;