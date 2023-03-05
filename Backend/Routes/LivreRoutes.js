const express = require("express")
const livreRoutes = express.Router()
const livreController = require("../Controllers/livreController")
const responsableMiddleware = require("../Middlewares/AuthMiddlewareResponsable")

livreRoutes.get("/get", responsableMiddleware.checkCurrentUser, responsableMiddleware.requireAuth, livreController.getLivres)
livreRoutes.get("/get/:id", responsableMiddleware.checkCurrentUser, responsableMiddleware.requireAuth, livreController.getLivreById)
livreRoutes.get("/search", responsableMiddleware.checkCurrentUser, responsableMiddleware.requireAuth, livreController.searchLivreByNom);
livreRoutes.post("/add", responsableMiddleware.checkCurrentUser, responsableMiddleware.requireAuth, livreController.addLivre)
livreRoutes.delete("/delete/:id", responsableMiddleware.checkCurrentUser, responsableMiddleware.requireAuth, livreController.deleteLivre)
livreRoutes.patch("/update/:id", responsableMiddleware.checkCurrentUser, responsableMiddleware.requireAuth, livreController.updateLivre)
module.exports = livreRoutes