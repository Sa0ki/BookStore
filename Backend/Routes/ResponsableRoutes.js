const express = require("express")
const responsableRoutes = express.Router()
const responsableController = require("../Controllers/ResponsableController")
const middleware = require("../Middlewares/AuthMiddleware")

responsableRoutes.get("/get",  middleware.checkCurrentUser, middleware.requireAuth, responsableController.getResponsables)
responsableRoutes.get("/get/:id", middleware.checkCurrentUser, middleware.requireAuth, responsableController.getResponsableById)
responsableRoutes.post("/add", middleware.checkCurrentUser, middleware.requireAuth, responsableController.addResponsable)
responsableRoutes.delete("/delete/:id", middleware.checkCurrentUser, middleware.requireAuth, responsableController.deleteResponsable)
responsableRoutes.patch("/update/:id", middleware.checkCurrentUser, middleware.requireAuth, responsableController.updateResponsable)
responsableRoutes.post("/connexion", middleware.checkCurrentUser, responsableController.connexion)
responsableRoutes.get("/deconnexion", middleware.checkCurrentUser, middleware.requireAuth ,responsableController.deconnexion)

module.exports = responsableRoutes