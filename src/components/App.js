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
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [request, setRequest] = React.useState("");
  const [fill, setFill] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const [isNotFound, setNotFound] = React.useState({status: false, message: "Ничего не найдено"});
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [isBadRequest, setBadRequest] = React.useState("");

  const history = useHistory();

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res.email) {
            setUserEmail(res.email);
            setLoggedIn(true);
            history.push("/movies");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  /*React.useEffect(() => {
    if (loggedIn) {
      api
        .getAppInfo()
        .then(([cardsArray, userData]) => {
          setCards(cardsArray);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);*/

  const handleRegister = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((data) => {
        console.log(data[0]);
        setBadRequest("");
        handleLogin(email, password);
      })
      .catch((err) => {
        if (err === "Ошибка 401" || err === "Ошибка 400") setBadRequest("Ошибка: некорректно введены данные")
        else if (err === "Ошибка 409") setBadRequest("Пользователь с таким email уже существует")
        else setBadRequest("Ошибка сервера. Пожалуйста, попробуйте позже");
        console.log(err);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setUserEmail(email);
          setLoggedIn(true);
          setBadRequest("");
          history.push("/");
        }
      })
      .catch((err) => {
        if (err === "Ошибка 401" || err === "Ошибка 400") setBadRequest("Ошибка входа: неправильная почта или пароль")
        else setBadRequest("Ошибка сервера. Пожалуйста, попробуйте позже");
        console.log(err);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  };

  React.useEffect(() => {
    if (localStorage.getItem("cards")) setCards(JSON.parse(localStorage.getItem("cards")));
  }, []);

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
    setNotFound({status: false});
    setLoading(true);
    moviesApi
      .getCard()
      .then((movies) => {
        const moviesFilter = movies.filter(function (element) {
          return element.nameRU.toLowerCase().includes(request.toLowerCase());
        })
        if (moviesFilter.length === 0) setNotFound({status: true, message: "Ничего не найдено"});
        localStorage.setItem("cards", JSON.stringify(moviesFilter));
        setCards(moviesFilter);
      })
      .catch((err) => {
        setNotFound({status: true, message: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"});
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute
            loggedIn={loggedIn}
            path="/movies"
          >
            <Header backgroundColor={"gray"} onOpen={handleMenuClick} />
            <SearchForm 
              request={request}
              fill={fill}
              onEdtitRequest={handleChangeRequest}
              onSubmit={handleSubmitSearch}
            />
            <MoviesCardList cards={cards} isLoading={isLoading} isNotFound={isNotFound} />
            <Footer />
            <Navigation
            isOpen={isMenuOpen}
            onClose={closeMenu}
            />
          </ProtectedRoute>
          <ProtectedRoute
            loggedIn={loggedIn}
            path="/saved-movies"
          >
            <Header backgroundColor={"gray"} onOpen={handleMenuClick} />
            <SearchForm 
              request={request}
              fill={fill}
              onEdtitRequest={handleChangeRequest}
              onSubmit={handleSubmitSearch}
            />
            <MoviesCardList cards={cards} isLoading={isLoading} isNotFound={isNotFound} />
            <Footer />
            <Navigation
            isOpen={isMenuOpen}
            onClose={closeMenu}
            />
          </ProtectedRoute>
          <ProtectedRoute
            loggedIn={loggedIn}
            path="/profile" 
          >
            <Header backgroundColor={"gray"} onOpen={handleMenuClick} />
            <Profile onSignOut={onSignOut} />
            <Navigation
            isOpen={isMenuOpen}
            onClose={closeMenu}
            />
          </ProtectedRoute>
          <Route path="/signup">
            <Register handleRegister={handleRegister} isBadRequest={isBadRequest} />
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin} isBadRequest={isBadRequest} />
          </Route>
          {/*<Route path="/movies">
            <Header backgroundColor={"gray"} onOpen={handleMenuClick} />
            <SearchForm 
              request={request}
              fill={fill}
              onEdtitRequest={handleChangeRequest}
              onSubmit={handleSubmitSearch}
            />
            <MoviesCardList cards={cards} isLoading={isLoading} isNotFound={isNotFound} />
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
          </Route>*/}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
