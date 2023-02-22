const express = require("express")
const responsableRoutes = express.Router()
const responsableController = require("../Controllers/ResponsableController")
const masterMiddleware = require("../Middlewares/AuthMiddlewareMaster")

responsableRoutes.get("/get",  masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth, responsableController.getResponsables)
responsableRoutes.get("/get/:id", masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth, responsableController.getResponsableById)
responsableRoutes.post("/add", masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth, responsableController.addResponsable)
responsableRoutes.delete("/delete/:id", masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth, responsableController.deleteResponsable)
responsableRoutes.patch("/update/:id", masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth, responsableController.updateResponsable)
responsableRoutes.get("/search", masterMiddleware.checkCurrentUser,masterMiddleware.requireAuth, responsableController.searchResponsableByName);
responsableRoutes.post("/connexion", masterMiddleware.checkCurrentUser, responsableController.connexion)
responsableRoutes.get("/deconnexion", masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth ,responsableController.deconnexion)

module.exports = responsableRoutes