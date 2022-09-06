const express = require("express")
const router = express.Router()
const { Diet } = require("../db")

let getDiets = async () => {
    try {
        let diets = [
            "vegan",
            "gluten free",
            "whole 30",
            "lacto ovo vegetarian",
            "paleolithic",
            "primal",
            "foodmap friendly",
            "pescatarian",
            "dairy free",
            "ketogenic"
        ];

        diets.forEach((el) => {
            Diet.findOrCreate({
                where: { name : el},
            });
        });
        let allDiets = await Diet.findAll();
        return allDiets
    } catch (error) {
        console.log(err);
        throw Error(err);
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