const express = require("express")
const axios = require("axios")
const router = express.Router()
require("dotenv").config()
const {YOUR_API_KEY} = process.env;
const {Recipe, Diet, Op} = require("../db")

const getApiFullData = async() => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
        return response.data.results.map((e) => {
            return {
                id: e.id,
                name: e.name,
                summary: e.summary,
                healthScore: e.healthScore,
                image: e.image,
                steps: e.analyzedInstructions[0]?.steps.map((s) => {
                    return {
                        number: s.number,
                        step: s.step
                    }
                }),
                diets: (e.diets?.map((i) => {
                    return {
                        name: i
                    }
                }))
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const getRecipesDb = async () => {
    try {
        let promise = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        })
        return promise
    } catch (error) {
       console.log(error) 
    }
}

const getAllRecipes = async () => {
    try {
        let api = await getApiFullData();
        let db = await getRecipesDb();
        let concat = api.concat(db)
        return concat;
    } catch (error) {
        console.log(error)
    }
}

router.get("/", async(req, res) => {
    try {
        let { name } = req.query;
        let recipes = await getAllRecipes();
        if(!name) return res.status(200).json(recipes);
        let auxRecipes = recipes.filter((e) => e.name.toUpperCase().includes((name.toUpperCase())));
        auxRecipes.length? res.json(auxRecipes): res.status(404).json({ msg: `not found recipes with ${name}`})
    } catch (error) {
        res.status(404).json({error})
    }
})


router.post("/", async(req, res) => {
    let {name, summary, healthScore, steps, img, diets} = req.body;
    let dietas = await Diet.findAll({
        where: {
            name: diets
        }
    });
    try {
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            img,
            steps
        });
        await newRecipe.addDiet(dietas);
        res.status(200).send("New Recipe successfully created!");
    } catch (error) {
        console.log(error)
    }
})

const getByIdApi = async (id) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`);
        let e = response.data;
        return {
            id: e.id,
            name: e.title.toLowerCase(),
            summary: e.summary.replaceAll(/<(“[^”]*”|'[^’]*’|[^'”>])*>/g, ''),
            healthScore: e.healthScore,
            img: e.image,
            steps: e.analyzedInstructions[0]?.steps.map((s) => {
                return {
                    number: s.number,
                    step: s.step
                }
            }),
            diets: (e.diets?.map((i) => {
                return {
                    name: i
                }
            }))
        }
    } catch (error) {
        console.log(error)
    }
}

router.get("/:id", async(req, res) => {
    try {
        let {id} = req.params
        if(!id) return res.status(400).json({ msg: "Id is required"})
        if (!id.includes('-')) {
            let recipe = await getByIdApi(id);
            return recipe? res.status(200).json(recipe): res.status(404).json({ msg: `not found recipes with id:  ${id}`})
        }else {
            let recipes = await getRecipesDb();
            let findId = recipes.find((e) => e.id === id);
            return findId? res.status(200).json(findId): res.status(404).json({ msg: `not found recipes with id:  ${id}`})
        }
    } catch (error) {
        return res.status(404).json({error})
    }
});

router.delete("/:id", async(req, res) => {
    try {
        let {id} = req.params;
        if(!id) return res.status(400).json({ msg: "Id is required"})
        await Recipe.destryo({
            where:{
                id: id
            }
        })
        return res.status(200).json({ msg: "successfully deleted"})
    } catch (error) {
        return res.status(400).json(error)
    }
});

router.put("/", async(req, res) => {
    try {
        let {id, name, summary, healthScore, steps, img, diets, dietsN} = req.body;
        const recipeS = await Recipe.findOne({
            where: {
                id: id
            }
        });
        await recipeS.update({name, summary, healthScore, img, steps})

        for (let i = 0; i < diets.length; i++) {
            let promise = await Diet.findOne({
                where: {name: diets[i].replaceAll(" ", "-")}
            })
            await recipeS.removeDiet(promise);
        }

        for (let i = 0; i < dietsN.length; i++) {
            let promise = await Diet.findOne({
                where: { name: dietsN[i].replaceAll(" ", "-")}
            })
            await recipeS.addDiet(promise)
        }
        return res.status(200).json("Recipe Updated!")
    } catch (error) {
        return res.status(400).json({ msg: "Recipe Not Updated"})
    }
})


module.exports = router