const { Db } = require("mongodb");
const {MongoClient,ServerApiVersion} = require('mongodb');

require("dotenv").config();

var client = null;

function connect() {
    if(client == null) {
        const uri = process.env.MONGO_URI;
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        client.connect(err => {
            if(err) {
                const collection = client.db("test").collection("devices");
        // perform actions on the collection object
                client.close();
            }
            else {
                console.log("Database connection successfully")
            }
            
        });
    }
}

function db() {
    return new Db(client, "MyLibrary")
}
function close() {
    if(client) {
        client.close()
        client=null
    }
}

module.exports = { connect, db, close}