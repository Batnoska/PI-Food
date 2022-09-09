import "./App.css";
import Landing from "./components/LandingPage/Landing";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route exact path="/create">
          <CreateRecipe />
        </Route>
        <Route exact path="/recipes/:id">
          <RecipeDetail />
        </Route>
      </div>
    </BrowserRouter>
  );
}


export default App;
