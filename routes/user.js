const express = require('express')

const router = express.Router()
const userController = require('../controllers/UserController')

router.post("/users/login", userController.login)

router.post("/register", userController.register)

// Modify user
router.get("/users/:id", userController.getUser)

// Delete user
router.delete("/users/:id", userController.deleteUser)

module.exports = router;