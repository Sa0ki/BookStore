const express = require("express")
const livreRoutes = express.Router()
const livreController = require("../Controllers/livreController")

livreRoutes.get("/get", livreController.getLivres)
livreRoutes.get("/get/:id", livreController.getLivreById)
livreRoutes.post("/add", livreController.addLivre)
livreRoutes.delete("/delete/:id", livreController.deleteLivre)
livreRoutes.patch("/update/:id", livreController.updateLivre)
module.exports = livreRoutes