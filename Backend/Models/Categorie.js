const mongoose = require("mongoose")

const categorieSchema = mongoose.Schema(
    {
        nom: String,
        description: String
    }   
)

const Categorie = mongoose.model("categories", categorieSchema)

module.exports = Categorie