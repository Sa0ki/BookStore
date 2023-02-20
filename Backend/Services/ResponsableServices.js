const Responsable = require("../Models/Responsable")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

const connexion = async(email, motDePasse) => {
    const r = await Responsable.findOne({email})
    if(!r)
        return "Email incorrect."

    const mdp = await bcrypt.compare(motDePasse, r.motDePasse)

    if(r && !mdp)
        return "Mot de passe incorrect."

    if(r && mdp)
    {   const id = r._id
        const nomPrenom = r.nom + " " + r.prenom
        return {
            token: jwt.sign({id}, "secret", {expiresIn: 60 * 60}), 
            maxAge: 60 * 60,
            user: nomPrenom
        }
    }
}

module.exports = {
    getResponsables, 
    getResponsableById, 
    addResponsable, 
    deleteResponsable, 
    updateResponsable, 
    connexion
}
