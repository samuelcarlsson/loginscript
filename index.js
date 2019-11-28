const express = require("express");
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const secret = require("./secret")
const login = require("./login")
const auth = require("./auth")
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.get("/",function(req,res){
    res.send(req.cookies);
});



//auth, en middlewear, kontrollerar att man är inloggad
app.get("/secret",auth,function(req,res){
    res.send(req.cookies);
});

app.get("/logout",function(req,res){
    res.cookie("token","hejdå")
    res.redirect("/secret")
})



app.get("/login",function(req,res){
    res.sendFile(__dirname+"/loginform.html");
});

app.post("/login",login,function(req,res){

    //hämta våra användare från db/fil  
});

// kollar om systemet har en angiven port, annars 3700...
const port = process.env.PORT || 3700
app.listen(port, function(){console.log("port:" +port)})