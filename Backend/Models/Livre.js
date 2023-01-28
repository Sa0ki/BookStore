const mongoose = require("mongoose")

const livreSchema = mongoose.Schema(
    {
        nom: String,
        description: String,
        isbn: String,
        auteur: String,
        editeur: String,
        dateEdition: String,
        image: String,
        categorie: {
            type: mongoose.Types.ObjectId,
            ref: "categories"
        }
    }
)

const Livre = mongoose.model("livres", livreSchema)

module.exports = Livre