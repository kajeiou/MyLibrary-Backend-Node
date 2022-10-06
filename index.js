
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { connect, db } = require('./db/connect');
const mongoose = require('mongoose')
const app = express();
const userController = require('./controllers/UserController')

app.use(cors());
app.use(bodyparser.json());
app.listen(2000, ()=> {
    console.log("Lancement du serveur sur le port 2000...")
})


// USER

connect()
db()

const userRoutes = require('./routes/user');

app.use('/users/',userRoutes)

app.get("/", (req,res)=> {
    res.send("My Library Backend")
})


app.get("/books", (req,res)=> {
  res.send("All books")
})