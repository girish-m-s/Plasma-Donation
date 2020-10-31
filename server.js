var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/patientDB", {useNewUrlParser : true});

const hospitalSchema = new mongoose.Schema ({
    hospitalName : String,
    Address : {
        City : String,
        Pincode : Number,
        Addressline : String 
    },
    IRDIANumber : Number,
    ContactNumber : Number,
    password : String,
    email : String
});
const HospitalData = mongoose.model("HospitalData", hospitalSchema);

app.get("/", function(req , res){
    res.sendFile(__dirname + "/public/page1.html");
});

app.post("/", function(req, res){
    console.log(req.body);
    const hospitalData = new HospitalData ({
        hospitalName : "Jayadeva Hospital",
        Address : {
            City : "Bangalore",
            Pincode : 560072,
            Addressline : "agsjasuha ahsahsua"
        },
        IRDIANumber : 234344,
        ContactNumber : 9838288822,
        password : "guhushahs"
    });
    hospitalData.save();
});

app.listen(3000, function(){
    console.log("hello");
})

