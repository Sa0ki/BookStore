const mongoose = require("mongoose")

const masterSchema = mongoose.Schema(
    {
        nom: String,
        prenom: String,
        email: String,
        phone: String,
        codeSecret: String,
        motDePasse: String,
        image: String
    }   
)

const Master = mongoose.model("masters", masterSchema)

module.exports = Master