const express = require("express")
const router = express.Router()
const { loadAllDiets } = require("../middleware/index")


router.get("/", loadAllDiets)

module.exports = router