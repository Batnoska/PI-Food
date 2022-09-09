const express = require("express")
const router = express.Router()
const { getRecipes, getRecipesById, createNewRecipe } = require("../middleware/index")

router.get("/", getRecipes);

router.get("/:id", getRecipesById);

router.post("/", createNewRecipe);

module.exports = router