const Livre = require("../Models/Livre")

const getLivres = async () => { return await Livre.find().populate("categorie") }

const getLivreById = async (id) => { return await Livre.findById(id) }

const addLivre = async (livre) => { 
    return await Livre.create(livre) 
}

const deleteLivre = async (id) => { return await Livre.findByIdAndDelete(id) }

const updateLivre = async(id, newLivre) => {
    const Livre = await Livre.findById(id)
    Object.assign(Livre, newLivre)
    Livre.save()
    return Livre
}

module.exports = {getLivres, getLivreById, addLivre, deleteLivre, updateLivre}
