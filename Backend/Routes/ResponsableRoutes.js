const express = require("express")
const responsableRoutes = express.Router()
const responsableController = require("../Controllers/ResponsableController")

responsableRoutes.get("/get", responsableController.getResponsables)
responsableRoutes.get("/get/:id", responsableController.getResponsableById)
responsableRoutes.post("/add", responsableController.addResponsable)
responsableRoutes.delete("/delete/:id", responsableController.deleteResponsable)
responsableRoutes.patch("/update/:id", responsableController.updateResponsable)

module.exports = responsableRoutes