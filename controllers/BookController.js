const Book = require("../models/Book.js")
const createError = require('http-errors');
const { default: mongoose } = require("mongoose");

exports.getAllBooks = async (req, res, next) => {
    try {
        // Récupérations de tous les livres
        const books = await Book.find({})
        if(!books) {
            res.status(404).send('Error books not founded' + error);
        }
        res.send(books)
    } catch(error) {
        res.status(404).send('Error books not founded' + error);
    }
}

exports.create =  (req, res, next) => {
    const newId = new mongoose.Types.ObjectId();
    const book = new Book({
        id: newId,
        bookName:  req.body.bookName,
        price: req.body.price,
        stock: req.body.stock,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount
    })
    // Enregistrement du livre dans la bdd
    book.save()
    .then(() => res.send(book))
    .catch(error =>  res.status(404).send('Error creating book ' + error));

}

exports.getBook =  async (req, res, next) => {
    const id = req.params.id
    try {
        // Récupération d'un livre par id
        const book = await Book.findById(id)
        if(!book) {
            res.status(404).send('Book id '+ id + ' not founded.');
        }
        res.send(book)
    } catch(error) {
        res.status(404).send('Error' + error)
    }
}

exports.updateBook =  async(req, res, next) => {
    const id = req.params.id
    try {
        //Mise à jour de tous les attributs du livre
        const book = await Book.findByIdAndUpdate(id, 
            {
                bookName: req.params.bookName,
                price: req.params.price,
                stock: req.params.bookName,
                isbn:req.params.isbn,
                pageCount:req.params.pageCount
            })
            res.send("book id " + id + " updated")
    }
    catch(error) {
        res.status(404).send('Error' + error)
    }
}

exports.deleteBook =  async (req, res, next) => {
    const id = req.params.id
    try {
        // Suppression du livre
        const delBook = await Book.deleteOne({_id : id})
        res.send("book id " + id + " deleted")
    }
    catch(error) {
        res.status(404).send('Error ' + error)
    }
}
