import React, { useState, useEffect } from "react";
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

import * as Storage from "./utils/localStorage";
import Footer from "./components/footer";

function App() {
  const [basket, setBasket] = useState(0);
  const [wishlist, setWishlist] = useState(0);
  const [account, setAccount] = useState(0);
  const [service, setService] = useState(0);

  useEffect(() => {
    // initialize local storage
    setBasket(Storage.getAmount("basket"));
    setWishlist(Storage.getAmount("wishlist"));
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <main className="main">
          <Navbar basket={basket} wishlist={wishlist}></Navbar>
          <NavTags></NavTags>
          <Switch>
            <Route
              path="/wishlist"
              render={(props) => (
                <Wishlist
                  {...props}
                  setWishlist={(value) => setWishlist(value)}
                  setBasket={(value) => setBasket(value)}
                />
              )}
            />
            <Route
              path="/basket"
              render={(props) => (
                <Basket
                  {...props}
                  setBasket={(value) => setBasket(value)}
                  setWishlist={(value) => setWishlist(value)}
                />
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
                  wishlist={wishlist}
                  setBasket={(value) => setBasket(value)}
                  setWishlist={(value) => setWishlist(value)}
                />
              )}
            />
            <Route path="/not-found" component={NotFound} />
            <Route exact path="" component={Home} />
            {/* <Redirect from="/" path="/" exact to="" /> */}
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
}

export default App;
