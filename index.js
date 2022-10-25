
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { connect, db } = require('./db/connect');
const app = express();

// Lancement du serveur
app.use(cors());
app.use(bodyparser.json());
app.listen(2000, ()=> {
    console.log("Lancement du serveur sur le port 2000...")
})

// Connexion à MariaDB
connect()
db()

// Home Page
app.get("/", (req,res)=> {
  res.send("My Library Backend")
})

// Routes Utilisateur
const userRoutes = require('./routes/user');
app.use('/users/',userRoutes)

// Routes Livre
const bookRoutes = require('./routes/book');
app.use('/books/', bookRoutes)
