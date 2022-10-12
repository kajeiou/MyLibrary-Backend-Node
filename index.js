
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { connect, db } = require('./db/connect');
const mongoose = require('mongoose')
const app = express();
const userController = require('./controllers/UserController.js')
const bookController = require('./controllers/BookController.js')

app.use(cors());
app.use(bodyparser.json());
app.listen(2000, ()=> {
    console.log("Lancement du serveur sur le port 2000...")
})


// USER

connect()
db()

app.get("/", (req,res)=> {
  res.send("My Library Backend")
})


const userRoutes = require('./routes/user');
app.use('/users/',userRoutes)


const bookRoutes = require('./routes/book');
app.use('/books/', bookRoutes)