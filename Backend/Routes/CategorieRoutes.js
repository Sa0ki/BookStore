const express = require("express")
const categorieRoutes = express.Router()
const categorieController = require("../Controllers/CategorieController")

categorieRoutes.get("/get", categorieController.getCategories)
categorieRoutes.get("/get/:id", categorieController.getCategorieById)
categorieRoutes.post("/add", categorieController.addCategorie)
categorieRoutes.delete("/delete/:id", categorieController.deleteCategorie)
categorieRoutes.patch("/update/:id", categorieController.updateCategorie)
module.exports = categorieRoutes