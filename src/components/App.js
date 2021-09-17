import logo from "../logo.svg";
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Title from "./Title";
import About from "./About";
import Technologies from "./Technologies";
import Student from "./Student";
import Footer from "./Footer";
import SearchForm from "./SearchForm";
import Preloader from "./Preloader";
import MoviesCardList from "./MoviesCardList";
import Profile from "./Profile";
import Register from "./Register";
import Login from "./Login";
import NotFound from "./NotFound";
import Navigation from "./Navigation";

function App() {
    return (
    <div className="page">
      <Switch>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/movies">
          <Header backgroundColor={"gray"} />
          <SearchForm />
          <Preloader />
          <MoviesCardList />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header backgroundColor={"gray"} />
          <SearchForm />
          <Preloader />
          <MoviesCardList />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header backgroundColor={"gray"} />
          <Profile />
        </Route>
        <Route exact path="/">
          <Header />
          <Title />
          <About />
          <Technologies />
          <Student />
          <Footer />
          <Navigation />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
