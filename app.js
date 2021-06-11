const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

// simple route
app.get("/", (req, res)=>{
    res.json({message:"Welcome to application"})
})

require("./routes/customer.routes")(app)

// set port, listen for requests
app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})