import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../elementos/Header/Header";
import Home from "../Home/Home";
import Filme from "../Filme/Filme";
import NaoEncontrado from "../elementos/NaoEncontrado/NaoEncontrado";

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:filmeId" component={Filme} exact />
          <Route component={NaoEncontrado} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
