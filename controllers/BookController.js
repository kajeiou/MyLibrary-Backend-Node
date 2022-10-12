const Book = require("../models/Book.js")
const createError = require('http-errors');
const { default: mongoose } = require("mongoose");

exports.getAllBooks = async (req, res, next) => {
    console.log("get all books")
    try {
        const books = await Book.find({})
        if(!books) {
            console.log('Books not founded.')
            throw createError(404, 'Books not founded.');
        }
        res.send(books)
    } catch(error) {
        console.log(error)
        createError(404, 'Error' + error)
    }
}

exports.create =  (req, res, next) => {
    console.log("create")
    const newId = new mongoose.Types.ObjectId();

    const book = new Book({
        id: newId,
        bookName:  req.body.bookName,
        price: req.body.price,
        stock: req.body.stock,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount
    })
    book.save()
    .then(() => res.send(book))
    .catch(error =>  console.log("error register"+error));

}

exports.getBook =  async (req, res, next) => {
    console.log("get a book")
    const id = req.params.id
    try {
        const book = await Book.findById(id)
        if(!book) {
            console.log('Book id '+ id + ' not founded.')
            throw createError(404, 'Book id '+ id + ' not founded.');
        }
        res.send(book)
    } catch(error) {
        console.log(error)
        createError(404, 'Error' + error)
    }
}

exports.updateBook =  (req, res, next) => {
    console.log("update a book")
}

exports.deleteBook =  async (req, res, next) => {
    const id = req.params.id
    try {
        const delBook = await Book.deleteOne({_id : id})
        res.send("book deleted")
    }
    catch(error) {
        console.log(error)
        createError(404, 'Error' + error)
    }
}
