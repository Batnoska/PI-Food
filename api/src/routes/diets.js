const express = require("express")
const axios = require("axios")
require("dotenv").config()
const { YOUR_API_KEY } = process.env
const router = express.Router()
const { Diet } = require("../db")

let getDiets = async () => {
    try {
        let diet = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
        );
        let types = await diet.data.results.map((e) => e.diets);
        let otro = types.flat();


        let diets = [
            ...new Set(otro),
            "vegetarian",
            "lacto vegetarian",
            "ovo vegetarian",
            "ovo lacto vegetarian"
        ];


        diets.forEach(async (el) => {
            await Diet.findOrCreate({
                where: { name : el},
            });
        });
        let allDiets = await Diet.findAll();
        return allDiets
    } catch (error) {
        console.log(error);
        throw Error(error);
    }
}

router.get("/", async (req, res) => {
    try {
        let dietData = await getDiets();
        res.status(200).send(dietData)
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = router