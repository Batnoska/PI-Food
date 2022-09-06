const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipe = require("./recipe")
const diet = require("./diets")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipe", recipe)
router.use("/diets", diet)


module.exports = router;
