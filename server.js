var express = require("express");
var bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));

app.get("/", function(req , res){
    res.sendFile(__dirname + "/public/page1.html");
});

app.post("/", function(req, res){
    console.log(req.body);
});

app.listen(3000, function(){
    console.log("hello");
})
