const jwt = require("jsonwebtoken")
const Responsable = require("../Models/Responsable")

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, "secret", (error, decodedToken) => {
            if(error)
                res.status(500).json("Token false")
            else
                next()
        })
    }
    else
        res.status(500).json("Aucun cookie présent.")
}

const checkCurrentUser = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, "secret", async (error, decodedToken) => {
            if(error){
                res.locals.user = ""
                next()
            }  
            else{
                let user = await Responsable.findById(decodedToken.id)
                res.locals.user = user.email
                next()
            }
        })
    }
    else{
        res.locals.user = ""
        next()
    }
        
}

module.exports = {requireAuth, checkCurrentUser}