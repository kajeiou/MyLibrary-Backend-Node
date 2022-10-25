const { Db } = require("mongodb");
const {MongoClient,ServerApiVersion} = require('mongodb');
const { default: mongoose } = require("mongoose");
require("dotenv").config();


function connect() {
    // Récupération de l'url dans le fichier d'environnement
    const uri = process.env.MONGO_URI;
    // Connexion à la base de données Mongo
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
            if(err) {
               console.error(err)
            }
            else {
                console.log("Database connection successfully")
            }
        }
    )
}

function db() {
    console.log("Connection database MyLibrary")
}
function close() {
}

module.exports = { connect, db, close}