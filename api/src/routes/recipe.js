const express = require("express")
const router = express.Router()
const { getRecipes, getRecipeById, createNewRecipe } = require("../middleware/index")

router.get("/", getRecipes);

router.get("/:id", getRecipeById);

router.post("/", createNewRecipe);

module.exports = router