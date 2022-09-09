const axios = require("axios");
const { Recipe, Diet } = require("../db");

const { getAllInfo } = require("./recipesMiddleware");
const { getAllDiets } = require("./dietsMiddleware");


//cargar todas las dietas
const loadAllDiets = async (req,res) => {
    try {
        const diets = await getAllDiets();
        return res.json(diets);
    } catch (error) {
        res.status(400).json({msg:error});
    }
}

//receta por query (nombre)
const getRecipes = async (req, res, next) => {
    const { name } = req.query;
    
    try {
        const info = await getAllInfo();
        if (name) {
            let matchedRecipe = await info.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if (matchedRecipe.length) return res.json(matchedRecipe)
            return res.status(404).json({ message: "No recipes found" })
        }
        return res.json(info)
    } catch (error) {
        next(error)
        
    }
}

//receta por id
const getRecipeById = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const recipesTotal = await getAllInfo()
        if(id){
                let recipeId = await recipesTotal.filter((r) => r.id == id);
                
                recipeId.length
                ? res.status(200).json(recipeId)
                : res.status(404).json("Recipe not found");
            }
    } catch (error) {
        next(error)
    }
}


//crear receta
const createNewRecipe = async (req, res,next) => {
    const { name, summary, healthScore, steps, image,diets} = req.body
    //validaciones
    if (!summary || !name) return res.status(404).send('Falta enviar datos obligatorios')
    !diets ? diets=[''] : [...diets]
    if(name.length > 100 || name.length < 3) return res.status(404).send('El nombre debe tener entre 3 y 100 caracteres')
    if(name.search(/[^{};*@>!<]*$/g) !== 0) return res.status(404).send('El nombre no puede contener caracteres especiales')
    if(summary.length > 500 || summary.length < 3) return res.status(404).send('El resumen debe tener entre 3 y 500 caracteres')
    
    if(isNaN(healthScore)) return res.status(404).send('El score debe ser un numero')
    try {
        const data = { name, summary, healthScore, steps, image }
        const newRecipe = await Recipe.create(data)
        //busco todas las dietas que coincidan con las que me llegaron y las asocio a la receta
        //porque la idea es que la nueva receta, se relacione con las dietas que ya existen en la base de datos
        let newDiets = await Promise.all(diets.map(d=> Diet.findOne({where: {name: d}})))
        newRecipe.addDiets(newDiets)
        return res.status(201).json(newRecipe)
    } catch (error) {
        next(error)
    }
}



module.exports = {
    getRecipes,
    loadAllDiets,
    getRecipeById, 
    createNewRecipe,
}