const express = require("express");
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const secret = require("./secret")

module.exports = function(req,res,next){
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
            {             //ger användare tillgång till en server  
               const token = jwt.sign({email:user[0].email},secret,{expiresIn:60}) 
               res.cookie("token",token,{httpOnly:true,sameSite:"strict"})
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

    

};   
