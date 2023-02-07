const categorieServices = require("../Services/categorieServices")

const getCategories = async (req, res) => {
    try{res.status(200).json(await categorieServices.getCategories())}
    catch(error){res.status(500).json(error)}
}

const getCategorieById = async (req, res) => {
    try{res.status(200).json(await categorieServices.getCategorieById(req.params.id))}
    catch(error){res.status(404).json(error)}
}

const addCategorie = async (req, res) => {
    try{res.status(200).json(await categorieServices.addCategorie(req.body))}
    catch(error){res.status(500).json(error)}
}

const deleteCategorie = async (req, res) => {
    try{res.status(200).json(await categorieServices.deleteCategorie(req.params.id))}
    catch(error){res.status(500).json(error)}
}

const updateCategorie = async (req, res) => {
    try{res.status(200).json(await categorieServices.updateCategorie(req.params.id, req.body))}
    catch(error){res.status(500).json(error)}
}

module.exports = {getCategories, getCategorieById, addCategorie, deleteCategorie, updateCategorie}