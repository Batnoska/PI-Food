/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  id:'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  name: 'Huevos fritos',
  summary:"El huevo frito es una forma muy rápida y bastante tradicional de hacer una fritura de un huevo. Su preparación apenas dura unos segundos.",
  diets:["dairy free"]
};
const recipeO = {  
  name:"Fideos",
  summary:"tipo de pasta con forma alargada. Los fideos pueden ser cortos, como el şehriye o el cabello de ángel, o bien largos y gruesos como los pici o los soba, igualmente largos pero más finos como los spaghetti, o extremadamente finos como los fideos de cristal.", 
  healthScore: 10 , 
  steps:"comprar, cocinar en agua abundante y servir",
  diets:["vegetarian"]
};
const recipeIncomp ={
  summary:"tipo de pasta con forma alargada. Los fideos pueden ser cortos, como el şehriye o el cabello de ángel, o bien largos y gruesos como los pici o los soba, igualmente largos pero más finos como los spaghetti, o extremadamente finos como los fideos de cristal.", 
  healthScore: 10 , 
  steps:"comprar, cocinar en agua abundante y servir",
}
describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  
  describe('GET /recipes/:id', () => {
    it('should return a recipe', ( )=>{
      agent.get('/recipes/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11').expect(200).timeout(10000)
    })
  })
  describe('GET /diets', () => {
    it('should get 200 when get all diets', () =>
      agent.get('/diets').expect(200).timeout(10000)
    );
  });
  describe('POST recipes/', () => {
   it('should get 200 status when created', () =>
      agent.post('/recipes')
      .send(recipeO).expect(201).timeout(10000)
    ); 
    it('should get 404 status when created', () =>
      agent.post('/recipes')
      .send(recipeIncomp).expect(404).timeout(10000)
    );
  });  
  
});