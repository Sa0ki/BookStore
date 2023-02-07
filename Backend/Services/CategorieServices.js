const Categorie = require("../Models/Categorie")

const getCategories = async () => { return await Categorie.find() }

const getCategorieById = async (id) => { return await Categorie.findById(id) }

const addCategorie = async (ca) => { 
    return await Categorie.create(ca) 
}

const deleteCategorie = async (id) => { return await Categorie.findByIdAndDelete(id) }

const updateCategorie = async(id, newCategorie) => {
    const Categorie = await Categorie.findById(id)
    Object.assign(Categorie, newCategorie)
    Categorie.save()
    return Categorie
}

module.exports = {getCategories, getCategorieById, addCategorie, deleteCategorie, updateCategorie}
