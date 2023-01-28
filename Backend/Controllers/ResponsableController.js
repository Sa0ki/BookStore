const responsableServices = require("../Services/ResponsableServices")

const getResponsables = async (req, res) => {
    try{res.status(200).json(await responsableServices.getResponsables())}
    catch(error){res.status(500).json(error)}
}

const getResponsableById = async (req, res) => {
    try{res.status(200).json(await responsableServices.getResponsableById(req.params.id))}
    catch(error){res.status(404).json(error)}
}

const addResponsable = async (req, res) => {
    try{res.status(200).json(await responsableServices.addResponsable(req.body))}
    catch(error){res.status(500).json(error)}
}

const deleteResponsable = async (req, res) => {
    try{res.status(200).json(await responsableServices.deleteResponsable(req.params.id))}
    catch(error){res.status(500).json(error)}
}

const updateResponsable = async (req, res) => {
    try{res.status(200).json(await responsableServices.updateResponsable(req.params.id, req.body))}
    catch(error){res.status(500).json(error)}
}

module.exports = {getResponsables, getResponsableById, addResponsable, deleteResponsable, updateResponsable}