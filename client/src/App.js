import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Detail from "./components/CardDetail/Detail";
import Creation from "./components/Form/Form";
import React from 'react';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/details/:id"} component={Detail} />
        <Route exact path={"/create"} component={Creation} />
      </Switch>
    </div>
  );
}

export default App;
