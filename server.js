let express = require("express");
let path = require("path"); 
let app = express();
let bodyParser = require("body-parser");
let htmlRoutes = require("./app/routing/htmlRoutes");
//let apiRoutes = require("./app/routing/apiRoutes")

const PORT = 3000; 

app.use(express.static(__dirname + "/app"));


// app.use("/submit",apiRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/",htmlRoutes);


app.listen(process.env.PORT||PORT);