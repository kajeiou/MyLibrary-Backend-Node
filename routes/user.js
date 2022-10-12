const express = require('express')

const router = express.Router()
const userController = require('../controllers/UserController.js')

router.post("/login", userController.login)

router.post("/register", userController.register)

// Modify user
router.get("/:id", userController.getUser)

// Delete user
router.delete("/:id", userController.deleteUser)

module.exports = router;