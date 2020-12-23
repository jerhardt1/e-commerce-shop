import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./components/mainPage";
import NavTags from "./components/navTags";
import Product from "./components/productDetail";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";

import "./scss/custom.scss";
import Home from "./components/home";
import Basket from "./components/basket";
import Wishlist from "./components/wishlist";

function App() {
  const [basket, setBasket] = useState(0);
  const [wishlist, setWishlist] = useState(0);
  const [account, setAccount] = useState(0);
  const [service, setService] = useState(0);

  return (
    <React.Fragment>
      <main className="container">
        <Navbar basket={basket}></Navbar>
        <NavTags></NavTags>
        <Switch>
          <Route path="wishlist" component={Wishlist} />
          <Route
            path="/basket"
            render={(props) => (
              <Basket {...props} setBasket={(value) => setBasket(value)} />
            )}
          />
          <Route exact path="/:id" component={MainPage} />
          <Route path="/products" component={MainPage} />
          <Route
            path="/product/:id"
            render={(props) => (
              <Product
                {...props}
                basket={basket}
                setBasket={(value) => setBasket(value)}
              />
            )}
          />
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
