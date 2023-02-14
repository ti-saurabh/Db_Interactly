const express=require('express')
const bodyParser = require('body-parser')
const mongoose  = require('mongoose')
const route = require("./routes/route")
const app = express()

app.use(bodyParser.json())


mongoose.connect("mongodb+srv://Saurabh-FunctionUp:SAURABHtiwari2501@cluster0.ppnw4vg.mongodb.net/Interactly", {
       useNewUrlParser: true
    })
    .then( () => console.log("MongoDb is connected"))
    .catch ( err => console.log(err) )

    app.use('/', route)
 

app.listen(8000, () => {
  console.log("Running on port 8000.")
});