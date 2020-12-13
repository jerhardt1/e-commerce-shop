import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./components/mainPage";
import NavTags from "./components/navTags";
import Product from "./components/productDetail";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";

import "./scss/custom.scss";
import Home from "./components/home";
import Basket from "./components/basket";

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <Navbar></Navbar>
        <NavTags></NavTags>
        <Switch>
          <Route path="/basket" component={Basket} />
          <Route exact path="/:id" component={MainPage} />
          <Route path="/products" component={MainPage} />
          <Route path="/product/:id" component={Product} />
          <Route path="/not-found" component={NotFound} />
          <Route exact path="" component={Home} />
          {/* <Redirect from="/" path="/" exact to="" /> */}
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
