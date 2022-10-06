
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const { connect } = require('./db/connect');


const app = express();

app.use(cors());
app.use(bodyparser.json());
app.listen(2000, ()=> {
    console.log("Lancement du serveur sur le port 2000...")
})



// CORS
/*app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin",'*');
  res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE')
}) 
*/
// USER

connect()
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



app.get("/books", (req,res)=> {
  res.send("All books")
})