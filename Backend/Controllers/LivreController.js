const livreServices = require("../Services/livreServices")

const getLivres = async (req, res) => {
    try{res.status(200).json(await livreServices.getLivres())}
    catch(error){res.status(500).json(error)}
}

const getLivreById = async (req, res) => {
    try{res.status(200).json(await livreServices.getLivreById(req.params.id))}
    catch(error){res.status(404).json(error)}
}

const addLivre = async (req, res) => {
    try{res.status(200).json(await livreServices.addLivre(req.body))}
    catch(error){res.status(500).json(error)}
}

const deleteLivre = async (req, res) => {
    try{res.status(200).json(await livreServices.deleteLivre(req.params.id))}
    catch(error){res.status(500).json(error)}
}

const updateLivre = async (req, res) => {
    try{res.status(200).json(await livreServices.updateLivre(req.params.id, req.body))}
    catch(error){res.status(500).json(error)}
}

module.exports = {getLivres, getLivreById, addLivre, deleteLivre, updateLivre}