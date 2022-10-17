const express = require('express')

const router = express.Router()
const bookCategoryController = require('../controllers/BookCategoryController.js')

router.get("/:id/books", bookCategoryController.getBooksByCategory)

router.get("/:author/authors", bookCategoryController.getBooksByAuthor)


module.exports = router;