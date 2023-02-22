const Master = require("../Models/Master")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getMasters = async () => { return await Master.find() }

const getMasterById = async (id) => { return await Master.findById(id) }

const addMaster = async (master) => { 
    master.motDePasse = await bcrypt.hash(master.motDePasse, await bcrypt.genSalt())
    return await Master.create(master) 
}

const deleteMaster = async (id) => { return await Master.findByIdAndDelete(id) }

const updateMaster = async(id, newMaster) => {
    const master = await Master.findById(id)
    Object.assign(master, newMaster)
    master.save()
    return master
}

const searchMasterByName = async (nom) => {
    return await Master.find({ nom: new RegExp(nom, "i") });
};

const connexionMaster = async(codeSecret, motDePasse) => {
    const m = await Master.findOne({codeSecret})
    if(!m)
        return "Code secret incorrect."

    const mdp = await bcrypt.compare(motDePasse, m.motDePasse)

    if(m && !mdp)
        return "Mot de passe incorrect."

    if(m && mdp)
    {   const id = m._id
        const nomPrenom = m.nom + " " + m.prenom
        return {
            token: jwt.sign({id}, "secret", {expiresIn: 60 * 60}), 
            maxAge: 60 * 60,
            user: nomPrenom
        }
    }
}

module.exports = {
    getMasters, 
    getMasterById, 
    addMaster, 
    deleteMaster, 
    updateMaster, 
    searchMasterByName,
    connexionMaster
}
