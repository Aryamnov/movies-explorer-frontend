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
import moviesApi from "../utils/MoviesApi";

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  React.useEffect(() => {
    moviesApi
      .getCard()
      .then((movies) => {
        console.log(movies);
        setCards(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          <Header backgroundColor={"gray"} onOpen={handleMenuClick} />
          <SearchForm />
          <Preloader />
          <MoviesCardList cards={cards} />
          <Footer />
          <Navigation
          isOpen={isMenuOpen}
          onClose={closeMenu}
          />
        </Route>
        <Route path="/saved-movies">
          <Header backgroundColor={"gray"} onOpen={handleMenuClick} />
          <SearchForm />
          <Preloader />
          <MoviesCardList />
          <Footer />
          <Navigation
          isOpen={isMenuOpen}
          onClose={closeMenu}
          />
        </Route>
        <Route path="/profile">
          <Header backgroundColor={"gray"} onOpen={handleMenuClick} />
          <Profile />
          <Navigation
          isOpen={isMenuOpen}
          onClose={closeMenu}
          />
        </Route>
        <Route exact path="/">
          <Header/>
          <Title />
          <About />
          <Technologies />
          <Student />
          <Footer />
          
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
