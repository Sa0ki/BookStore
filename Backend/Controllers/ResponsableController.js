const responsableServices = require("../Services/ResponsableServices")

const getResponsables = async (req, res) => {
    try{res.status(200).json({
        "data": await responsableServices.getResponsables(),
        "currentUser": res.locals.user
    })}
    catch(error){res.status(500).json(error)}
}

const getResponsableById = async (req, res) => {
    try{res.status(200).json({
        "data": await responsableServices.getResponsableById(req.params.id),
        "currentUser": res.locals.user
    })}
    catch(error){res.status(404).json(error)}
}

const addResponsable = async (req, res) => {
    try{res.status(201).json({
        "data": await responsableServices.addResponsable(req.body),
        "currentUser": res.locals.user
    })}
    catch(error){res.status(500).json(error)}
}

const deleteResponsable = async (req, res) => {
    try{res.status(200).json({
        "data": await responsableServices.deleteResponsable(req.params.id),
        "currentUser": res.locals.user
    })}
    catch(error){res.status(500).json(error)}
}

const updateResponsable = async (req, res) => {
    try{res.status(200).json({
        "data": await responsableServices.updateResponsable(req.params.id, req.body),
        "currentUser": res.locals.user
    })}
    catch(error){res.status(500).json(error)}
}

const connexion = async(req, res) => {
    try{
        const jwt = await responsableServices.connexion(req.body.email, req.body.motDePasse)
        if(jwt === "Email incorrect." || jwt === "Mot de passe incorrect."){
            res.status(500).json(jwt)
        }
        else{
            res.cookie("jwt", jwt.token, {httpOnly: true, maxAge: jwt.maxAge * 1000})
            res.status(200).json({ "message": "connecté", "currentUser": res.locals.user})  
        }
        
    }catch(error){res.status(500).json("Problem -> " + error)}
}

const deconnexion = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1})
    res.status(200).json({"message": "déconnecté", "currentUser": res.locals.user})
}

module.exports = {
    getResponsables, 
    getResponsableById, 
    addResponsable, 
    deleteResponsable, 
    updateResponsable, 
    connexion,
    deconnexion
}