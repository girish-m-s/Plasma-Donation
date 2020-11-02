var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");



app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/patientDB", {useNewUrlParser : true});

var elementsdata = [] ;

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


const DonorSchema = new mongoose.Schema ({
    name : String,
    phone : Number,
    blood : String,
    ssr : Number,
    state : String,
    city : String,
});
const donor = mongoose.model("donor", DonorSchema);


//console.log(re.body);


app.get("/", function(req , res){
    res.sendFile(__dirname + "/public/homepage.html");
});

app.get("/login", function(request, respons){
    respons.sendFile(__dirname + "/public/login.html");
});

app.get("/signup", function(requ, respo){
    respo.sendFile(__dirname + "/public/signuppg.html");
});

app.get("/register", function(re, resp){
    resp.sendFile(__dirname + "/public/register.html");
});

app.get("/accounts/hospital", function(r, response){
    donor.find({}, function(err, elements){
        console.log(elements);
        //response.send(elements);
        response.render("abcd", {elementsdata : elements});
    });
});


app.post("/signup", function(requ, respo){
    respo.redirect("/login");
    console.log(requ.body);
    const hospitalData = new HospitalData ({
        hospitalName : requ.body.hospital_name,
          Address : {
              City : requ.body.city_name,
              Pincode : requ.body.pincode,
              Addressline : requ.body.address
          },
          IRDIANumber : requ.body.idria_num,
          ContactNumber : requ.body.phonenum,
          password : requ.body.Password
    });
    hospitalData.save();
});

app.post("/register", function(re, resp){

    console.log(re.body);

    const donordetails = new donor ({
        name : re.body.name,
        phone : re.body.phone,
        blood : re.body.blood,
        ssr : re.body.ssr,
        state : re.body.state,
        city : re.body.city,
});
    donordetails.save();

    resp.redirect("/")
});


app.post("/login", function(request, respons){
    HospitalData.find({}, function(err, data){
        if (err) {
            console.log(err);
        } else {
            data.forEach(function(data1){
                if (data1.IRDIANumber == request.body.irdi) {
                    if (data1.password == request.body.password){
                        
                    }
                   
                }
            });
        }

    });
    respons.redirect("/accounts/hospital");
});


app.listen(3000, function(){
    console.log("hello");
})

