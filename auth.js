const jwt = require("jsonwebtoken")
const secret = require("./secret")

module.exports = function(req,res,next){
    //börjar kolla att cookie existerar
    if(req.cookies.token){
        jwt.verify(req.cookies.token,secret,function(err,token){
            if(!err){
                next()
            }
            else
            {
                res.send(err.message)
            }
        })

    }
    else
    {
        res.send("no token provided")
    }
}