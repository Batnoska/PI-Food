const axios = require("axios")
const { Recipe, Diet } = require("../db");
const { YOUR_API_KEY } = process.env;

const getApiInfo = async () => {
    try {
        const apiInfo = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
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
        }
    } catch (error) {
        console.log(error)
        return [];
    }
};

const getDBInfo = async () => {
    try {
        const getDBInfo = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });

        let response = await getDBInfo?.map((recipe) => {
            return {
                id: recipe.id,
                name: recipe.name,
                summary: recipe.summary,
                score: recipe.score,
                healthScore: recipe.healthScore,
                image: recipe.image,
                steps: recipe.steps,
                createdInDb: recipe.createdInDb,
                diets: recipe.diets?.map((diet) => diet.name)
            };
        });
        return response;
    } catch (error) {
        console.log(error);
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
        console.log(error)
    }
};

module.exports = {
    getAllInfo,
}