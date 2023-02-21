const masterServices = require("../Services/MasterServices")

const getMasters = async (req, res) => {
    try{res.status(200).json({
        "data": await masterServices.getMasters(),
        "currentUser": res.locals.user
    })}
    catch(error){res.status(500).json(error)}
}

const getMasterById = async (req, res) => {
    try{res.status(200).json({
        "data": await masterServices.getMasterById(req.params.id),
        "currentUser": res.locals.user
    })}
    catch(error){res.status(404).json(error)}
}

const addMaster = async (req, res) => {
    try{res.status(201).json({
        "data": await masterServices.addMaster(req.body),
        "currentUser": res.locals.user
    })}
    catch(error){res.status(500).json(error)}
}

const deleteMaster = async (req, res) => {
    try{res.status(200).json({
        "data": await masterServices.deleteMaster(req.params.id),
        "currentUser": res.locals.user
    })}
    catch(error){res.status(500).json(error)}
}

const updateMaster = async (req, res) => {
    try{res.status(200).json({
        "data": await masterServices.updateMaster(req.params.id, req.body),
        "currentUser": res.locals.user
    })}
    catch(error){res.status(500).json(error)}
}

const connexionMaster = async(req, res) => {
    try{
        const jwt = await masterServices.connexionMaster(req.body.codeSecret, req.body.motDePasse)
        if(jwt === "Code secret incorrect." || jwt === "Mot de passe incorrect."){
            res.status(500).json(jwt)
        }
        else{
            res.cookie("jwt", jwt.token, {httpOnly: true, maxAge: jwt.maxAge * 1000})
            res.status(200).json({ "message": "connecté", "currentUser": res.locals.user})  
        }
        
    }catch(error){res.status(500).json("Problem -> " + error)}
}

const deconnexionMaster = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1})
    res.status(200).json({"message": "déconnecté", "currentUser": res.locals.user})
}

module.exports = {
    getMasters, 
    getMasterById, 
    addMaster, 
    deleteMaster, 
    updateMaster, 
    connexionMaster,
    deconnexionMaster
}