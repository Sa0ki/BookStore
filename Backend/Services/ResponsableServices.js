const bcrypt = require("bcrypt")
const Responsable = require("../Models/Responsable")

const getResponsables = async () => { return await Responsable.find() }

const getResponsableById = async (id) => { return await Responsable.findById(id) }

const addResponsable = async (responsable) => { 
    responsable.motDePasse = await bcrypt.hash(responsable.motDePasse, await bcrypt.genSalt())
    return await Responsable.create(responsable) 
}

const deleteResponsable = async (id) => { return await Responsable.findByIdAndDelete(id) }

const updateResponsable = async(id, newResponsable) => {
    const responsable = await Responsable.findById(id)
    Object.assign(responsable, newResponsable)
    responsable.save()
    return responsable
}

module.exports = {getResponsables, getResponsableById, addResponsable, deleteResponsable, updateResponsable}
