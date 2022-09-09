const axios = require("axios");
const { Recipe, Diet } = require("../db");

const { getAllInfo } = require("./recipesMiddleware");
const { getAllDiets } = require("./dietsMiddleware");


//traerme todas las dietas
const loadAllDiets = async (req, res) => {
    try {
        const diets = await getAllDiets();
        return res.json(diets);
    } catch (error) {
        res.status(400).json({msg:error})
    }
}


//traerme todas las recetas, o la especificada por query
const getRecipes = async (req, res, next) => {
    const { name } = req.query;

    try {
        const info = await getAllInfo();
        if (name) {
            let matchedRecipe = await info.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if(matchedRecipe.length) return res.json(matchedRecipe);
            return res.status(404).json({msg: "No recipes found"})
        }
        return res.json(info)
    } catch (error) {
        next(error)
    }
}

// receta por id
const getRecipesById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const recipesTotal = await getAllInfo();
        if (id) {
            let recipeId = await recipesTotal.filter((r) => r.id === id);

            recipeId.length
            ? res.status(200).json(recipeId)
            : res.status(404).json({msg: "Recipe not found"})
        }
    } catch (error) {
        next(error);
    }
}

// creacion de receta
const createNewRecipe = async(req, res, next) => {
    const { name, summary, healthScore, steps, image, diets} = req.body;
    // validaciones
    if(!summary || !name) return res.status(404).send("Missing mandatory data")
    !diets ? diets=[""] : [...diets]
    if(name.length > 100 || name.length < 3) return res.status(404).send("The name must have between 3 and 100 characters")
    if(name.search(/[^{};*@>!<]*$/g) !== 0) return res.status(404).send("The name must not contain special characters")
    if(summary.length > 500 || summary.length < 3) return res.status(404).send("Summary must have between 3 and 500 characters")
    if(isNaN(healthScore)) return res.status(404).send("The score must be a number")

    try {
        const data = { name, summary, healthScore, steps, image }
        const newRecipe = await Recipe.create(data)
        //busco las dietas que coincidan con las que me fueron pasadas por body para asociarlas a la receta
        //asi la nueva receta se relaciona con las dietas que ya existen en la database
        let newDiets = await Promise.all(diets.map(d => Diet.findOne({where: {name: d}})))
        newRecipe.addDiets(newDiets)
        return res.status(201).json(newRecipe)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getRecipes,
    loadAllDiets,
    getRecipesById,
    createNewRecipe
}