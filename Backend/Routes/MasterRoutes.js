const express = require("express")
const masterRoutes = express.Router()
const masterController = require("../Controllers/MasterController")
const masterMiddleware = require("../Middlewares/AuthMiddlewareMaster")

masterRoutes.get("/get",  masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth, masterController.getMasters)
masterRoutes.get("/get/:id", masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth, masterController.getMasterById)
masterRoutes.post("/add", masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth, masterController.addMaster)
masterRoutes.delete("/delete/:id", masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth, masterController.deleteMaster)
masterRoutes.patch("/update/:id", masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth, masterController.updateMaster)
masterRoutes.post("/connexion", masterMiddleware.checkCurrentUser, masterController.connexionMaster)
masterRoutes.get("/deconnexion", masterMiddleware.checkCurrentUser, masterMiddleware.requireAuth ,masterController.deconnexionMaster)

module.exports = masterRoutes