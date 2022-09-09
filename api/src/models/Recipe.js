const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.FLOAT,
      defaultValue:0,
      validate: {
        min:0,
        max:100,
        isNumber(value) {
          if(isNaN(value)) throw new Error("healthScore debe ser un numero")
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:"https://mejorconsalud.as.com/wp-content/uploads/2018/07/trucos-cocina.jpg"
    },
    steps: {
      type: DataTypes.TEXT
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
