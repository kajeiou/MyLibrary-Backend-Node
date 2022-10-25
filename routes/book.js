const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router()
const bookController = require('../controllers/BookController.js')

// Function vérification token
function secure(req,res, next) {
    try {
        // Récupération du jeton
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodeToken.userId;
        console.log(userId)
        res.locals.userId = userId;
        next();
    } catch (error) {
        res.status(401).json({ error : error | 'Authentification failed !'});
    }
}


// Get all books
router.get("/", bookController.getAllBooks)

// Get a book
router.get("/:id", bookController.getBook)

// Create a new book with token
router.post("/create",secure, bookController.create)

// Update a book with token
router.put("/:id", secure, bookController.updateBook)

// Delete a book with token
router.delete("/:id", secure, bookController.deleteBook)

module.exports = router;