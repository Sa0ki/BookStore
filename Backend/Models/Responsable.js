const mongoose = require("mongoose")

const responsableSchema = mongoose.Schema(
    {
        nom: String,
        prenom: String,
        email: String,
        motDePasse: String,
        image: String
    }   
)

const Responsable = mongoose.model("responsables", responsableSchema)

module.exports = Responsable