const {MongoClient,ServerApiVersion} = require('mongodb');
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.listen(2000, ()=> {
    console.log("Lancement du serveur...")
})


const uri = "mongodb+srv://nabil:7pouEnMxNUw1ZLDU@cluster0.p4pbfxx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

