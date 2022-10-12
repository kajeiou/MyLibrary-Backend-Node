const express = require('express')

const router = express.Router()
const bookController = require('../controllers/BookController.js')

router.get("/", bookController.getAllBooks)

router.post("/create", bookController.create)

router.get("/:id", bookController.getBook)

router.put("/:id", bookController.updateBook)

router.delete("/:id", bookController.deleteBook)


module.exports = router;