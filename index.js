const {MongoClient,ServerApiVersion} = require('mongodb');
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.listen(2000, ()=> {
    console.log("Lancement du serveur sur le port 2000...")
})

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// USER
app.get("/", (req,res)=> {
    res.send("My Library Backend")
})

app.get("/users/login")

app.get("/users/register")

// Modify user
app.get("/users/:id", (req,res)=> {
  let id = req.params.id;
  res.send("id " + id);
})

// Delete user
app.delete("/users/:id",(req,res)=> {
  let id = req.params.id;
  res.send("id " + id);
})