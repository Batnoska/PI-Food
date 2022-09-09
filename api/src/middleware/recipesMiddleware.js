const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { YOUR_API_KEY } = process.env;
//get recipes from api
const getApiInfo = async () => {
    try {
        const apiInfo = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=300`
        );
        const { results } = apiInfo.data;
        if (results.length > 0) {
        let response = await results?.map((recipeItem) => {
            return {
            name: recipeItem.title,
            vegetarian: recipeItem.vegetarian,
            vegan: recipeItem.vegan,
            glutenFree: recipeItem.glutenFree,
            dairyFree: recipeItem.dairyFree,
            image: recipeItem.image,
            id: recipeItem.id,
            score: recipeItem.spoonacularScore,
            healthScore: recipeItem.healthScore,
            types: recipeItem.dishTypes?.map((element) => element),
            diets: recipeItem.diets?.map((element) => element),
            summary: recipeItem.summary,
            steps:
                recipeItem.analyzedInstructions[0] &&
                recipeItem.analyzedInstructions[0].steps
                ? recipeItem.analyzedInstructions[0].steps
                    .map((item) => item.step)
                    .join(" \n")
                : "",
            };
        });
        return response;
        }
    } catch (error) {
        console.log("🚀 ~ file: recipesControllers.js ~ line 38 ~ getApiInfo ~ error", error)
        return [];
    }
};
//get recipes from db
const getDBInfo = async () => {
    try {
            const getDBinfo = await Recipe.findAll({
                include: {
                    model: Diet,
                    attributes: ["name"],
                    through: {
                    attributes: [],
                    },
                },
            });
        let response = await getDBinfo?.map((recipe) => {

        return {
            id: recipe.id,
            name: recipe.name,
            summary: recipe.summary,
            score: recipe.score,
            healthScore: recipe.healthScore,
            image: recipe.image,
            steps: recipe.steps,
            createdInDb: recipe.createdInDb,
            diets:recipe.diets?.map((diet) => diet.name),
        };
        });
        return response;
    } catch (error) {
        console.log("🚀 ~ file: recipesControllers.js ~ line 70 ~ getDBInfo ~ error", error)
        return [];
    }
    };

    const getAllInfo = async () => {
        try {
            const apiInfo = await getApiInfo();
            const bdInfo = await getDBInfo();
            const infoTotal = apiInfo.concat(bdInfo);
            return infoTotal;
        } catch (error) {
            console.log("🚀 ~ file: recipesControllers.js ~ line 81 ~ getAllInfo ~ error", error)
            
        }
    };

    module.exports = {
        getAllInfo,
    }