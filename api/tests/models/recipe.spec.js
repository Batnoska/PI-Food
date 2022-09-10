const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');


describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', async () => {
        try {
          await Recipe.create({summary:'Milanesa con queso y tomate'})
        } catch (error) {
          expect(error.message).to.equal("notNull Violation: recipe.name cannot be null");
        }
          
      });
      it('should work when its a valid name', async () => {
        
        const recipeCreated = await Recipe.create({ name: 'Milanesa a la napolitana', summary:'Milanesa con queso y tomate' }); 
        
        const found = await Recipe.findOne({
          where: {
            name: "Milanesa a la napolitana",
            summary:'Milanesa con queso y tomate'
          },
        });
        
        expect(await recipeCreated.name).to.equal(await found.dataValues.name);
      }); 
    });
    describe('summary', () => {
      it('should throw an error if summary is null', async () => {
        try {
          await Recipe.create({name:'Tortillas de papa'})
        } catch (error) {
          
          expect(error.message).to.equal("notNull Violation: recipe.summary cannot be null");
        }       
      });
      
      });
    });
    describe('healthScore', () => {
      it('should throw an error if healthScore is not a valid number', async () => {
        try {
          await Recipe.create({name:'Tortillas de papa', summary:'Papas en tortilla con huevo y condimentos', healthScore:400})
        } catch (error) {
          
          expect(error.message).to.equal("Validation error: Validation max on healthScore failed");
        }       
      });
      it('should should be ok if healthScore is between 0-100', async () => {
          const recipeCreated2=await Recipe.create({name:'Tortillas de papa', summary:'Papas en tortilla con huevo y condimentos', healthScore:5})
              
        expect(recipeCreated2).to.deep.include({name:'Tortillas de papa', summary:'Papas en tortilla con huevo y condimentos', healthScore:5});
      });
      });
    ;
  });