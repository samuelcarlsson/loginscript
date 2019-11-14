const express = require("express");
const bcrypt = require("bcryptjs")

const app = express();

app.use(express.urlencoded({extended:false}))

app.get("/",function(req,res){
    res.send("index route...");
});

app.get("/login",function(req,res){
    res.sendFile(__dirname+"/loginform.html");
});

app.post("/login",function(req,res){

    //hämta våra användare från db/fil

    const users = require("./users")

    const user = users.filter(function(u){

        if(req.body.email === u.email)
        {
            return true
        }
    })

    //om vi har en och exakt en användare med rätt email
    if(user.length===1)
    {//kolla lösenord

        bcrypt.compare(req.body.password,user[0].password,function(err,success){
            if(success)
            {
                res.send("login success!")
            }
            else
            {
                res.send("wrong password")
            }

        })
    }
    else
    {
        res.send("no such user")
    }

    /**
     * 1. hämta data som klienten skickat ( Repetition )
     * 2. Leta efter användare i databas/fil/minne
     * 3. Om användare ej finns skicka respons till klient med error
     * 4. Om användare finns gå vidare med att kolla lösenord
     * 5. Om löserord ej är korrekt skicka respons till klient med error
     * 6. Om lösenord är korrekt - Skicka respons/redirect 
     * 7. Nu när användaren är inloggad måste hen förbli så ett ta
     *    Detta löser vi med JWT.
     *    Skapa JWT och lagra i cookie innan din respons/redirect
     * 8. Skapa middleware för att skydda vissa routes.
     *    Här skall vi nu använda våra JWT för att hålla en användare inloggad. 
     * 9. Småfix för att förbättra säkerhet och fixa utloggning. 
     */

    

});

// kollar om systemet har en angiven port, annars 3700...
const port = process.env.PORT || 3700
app.listen(port, function(){console.log("port:" +port)});