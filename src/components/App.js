import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Title from "./Title";
import About from "./About";
import Technologies from "./Technologies";
import Student from "./Student";
import Footer from "./Footer";
import SearchForm from "./SearchForm";
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
  const [request, setRequest] = React.useState("");
  const [fill, setFill] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);

  //console.log(window.innerWidth);

  function handleChangeRequest(e) {
    if (e.target.value === "") {
      setFill(false);
      setRequest(e.target.value);
      return;
    }
    setRequest(e.target.value);
    setFill(true);
  }

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  function handleSubmitSearch(e) {
    e.preventDefault();
    setLoading(true);
    moviesApi
      .getCard()
      .then((movies) => {
        console.log(movies);
        const moviesFilter = movies.filter(function (element) {
          return element.nameRU.toLowerCase().includes(request.toLowerCase());
        })
        setCards(moviesFilter);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

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
          <SearchForm 
            request={request}
            fill={fill}
            onEdtitRequest={handleChangeRequest}
            onSubmit={handleSubmitSearch}
          />
          <MoviesCardList cards={cards} isLoading={isLoading} />
          <Footer />
          <Navigation
          isOpen={isMenuOpen}
          onClose={closeMenu}
          />
        </Route>
        <Route path="/saved-movies">
          <Header backgroundColor={"gray"} onOpen={handleMenuClick} />
          <SearchForm />
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
