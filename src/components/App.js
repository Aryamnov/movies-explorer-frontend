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
import {
  updateUserInfo,
  saveCard,
  getSavedMovies,
  deleteMovies,
} from "../utils/MainApi";

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [request, setRequest] = React.useState("");
  const [fill, setFill] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const [isNotFound, setNotFound] = React.useState({
    status: false,
    message: "Ничего не найдено",
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [isBadRequest, setBadRequest] = React.useState("");
  const [isEditProfile, setEditProfile] = React.useState(false);
  const [isSavedMovies, setSavedMovies] = React.useState([]);
  const [isStartSavedMovies, setStartSavedMovies] =React.useState([]);

  const history = useHistory();

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res.email) {
            setCurrentUser(res);
            setUserEmail(res.email);
            setLoggedIn(true);
            history.push("/movies");
          }
        })
        .catch((err) => {
          console.log(err);
          setBadRequest(
            "При авторизации произошла ошибка. Переданный токен некорректен"
          );
        });
    }
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const handleChangeProfile = (name, email) => {
    updateUserInfo(name, email)
      .then((res) => {
        setBadRequest("");
        setCurrentUser(res);
        setEditProfile(!isEditProfile);
      })
      .catch((err) => {
        if (err === "Ошибка 400")
          setBadRequest("Ошибка: некорректно введены данные");
        else if (err === "Ошибка 409")
          setBadRequest("Пользователь с таким email уже существует");
        else if (err === "Ошибка 404")
          setBadRequest("Страница по указанному маршруту не найдена");
        else if (err === "Ошибка 500")
          setBadRequest("На сервере произошла ошибка");
        else setBadRequest("При обновлении профиля произошла ошибка");
        console.log(err);
      });
  };

  const handleEdit = () => {
    setEditProfile(!isEditProfile);
  };

  const handleSaveCard = (card) => {
    saveCard(card)
      .then((res) => {
        getSavedCards();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteCard = (card) => {
    let id = 0;
    if (card.id) {
      id = isSavedMovies.find((item) => item.movieId === card.id)._id;
    } else {
      id = card._id;
    }
    deleteMovies(id)
      .then((movieDeleted) => {
        setSavedMovies(isSavedMovies.filter(movie => movieDeleted._id !== movie._id));
        setStartSavedMovies(isSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((data) => {
        console.log(data[0]);
        setBadRequest("");
        handleLogin(email, password);
      })
      .catch((err) => {
        if (err === "Ошибка 401" || err === "Ошибка 400")
          setBadRequest("Ошибка: некорректно введены данные");
        else if (err === "Ошибка 409")
          setBadRequest("Пользователь с таким email уже существует");
        else if (err === "Ошибка 404")
          setBadRequest("Страница по указанному маршруту не найдена");
        else if (err === "Ошибка 500")
          setBadRequest("На сервере произошла ошибка");
        else setBadRequest("При регистрации пользователя произошла ошибка");
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
          tokenCheck();
          history.push("/");
        }
      })
      .catch((err) => {
        if (err === "Ошибка 401" || err === "Ошибка 400")
          setBadRequest("Вы ввели неправильный логин или пароль");
        else if (err === "Ошибка 409")
          setBadRequest("Пользователь с таким email уже существует");
        else if (err === "Ошибка 404")
          setBadRequest("Страница по указанному маршруту не найдена");
        else if (err === "Ошибка 500")
          setBadRequest("На сервере произошла ошибка");
        else setBadRequest("При обновлении профиля произошла ошибка");
        console.log(err);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  };

  React.useEffect(() => {
    if (localStorage.getItem("cards"))
      setCards(JSON.parse(localStorage.getItem("cards")));
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

  const getSavedCards = () => {
    getSavedMovies()
      .then((movies) => {
        const userSavedMovies = movies.filter(function (movie) {
          return movie.owner === currentUser._id;
        });
        setSavedMovies(userSavedMovies);
        setStartSavedMovies(userSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getSavedCards();
  }, [currentUser]);

  function handleSubmitSearch(e) {
    e.preventDefault();
    setNotFound({ status: false });
    setLoading(true);
    moviesApi
      .getCard()
      .then((movies) => {
        const moviesFilter = movies.filter(function (element) {
          return element.nameRU.toLowerCase().includes(request.toLowerCase());
        });
        if (moviesFilter.length === 0)
          setNotFound({ status: true, message: "Ничего не найдено" });
        localStorage.setItem("cards", JSON.stringify(moviesFilter));
        setCards(moviesFilter);
      })
      .catch((err) => {
        setNotFound({
          status: true,
          message:
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
        });
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  function handleSubmitSearchinSaved(e) {
    e.preventDefault();
    setNotFound({ status: false });
    setLoading(true);
    const moviesFilter = isStartSavedMovies.filter(function (element) {
      return element.nameRU.toLowerCase().includes(request.toLowerCase());
    });
    setSavedMovies(moviesFilter);
    if (isSavedMovies.length === 0)
          setNotFound({ status: true, message: "Ничего не найдено" });
    setLoading(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute loggedIn={loggedIn} path="/movies">
            <Header
              backgroundColor={"gray"}
              onOpen={handleMenuClick}
              loggedIn={loggedIn}
              userEmail={userEmail}
            />
            <SearchForm
              request={request}
              fill={fill}
              onEdtitRequest={handleChangeRequest}
              onSubmit={handleSubmitSearch}
            />
            <MoviesCardList
              cards={cards}
              isLoading={isLoading}
              isNotFound={isNotFound}
              handleSaveCard={handleSaveCard}
              isSavedMovies={isSavedMovies}
              handleDeleteCard={handleDeleteCard}
            />
            <Footer />
            <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
          </ProtectedRoute>
          <ProtectedRoute loggedIn={loggedIn} path="/saved-movies">
            <Header
              backgroundColor={"gray"}
              onOpen={handleMenuClick}
              loggedIn={loggedIn}
              userEmail={userEmail}
            />
            <SearchForm
              request={request}
              fill={fill}
              onEdtitRequest={handleChangeRequest}
              onSubmit={handleSubmitSearchinSaved}
            />
            <MoviesCardList
              cards={isSavedMovies}
              isLoading={isLoading}
              isNotFound={isNotFound}
              handleDeleteCard={handleDeleteCard}
            />
            <Footer />
            <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
          </ProtectedRoute>
          <ProtectedRoute loggedIn={loggedIn} path="/profile">
            <Header
              backgroundColor={"gray"}
              onOpen={handleMenuClick}
              loggedIn={loggedIn}
              userEmail={userEmail}
            />
            <Profile
              onSignOut={onSignOut}
              handleChangeProfile={handleChangeProfile}
              isEditProfile={isEditProfile}
              handleEdit={handleEdit}
              isBadRequest={isBadRequest}
            />
            <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
          </ProtectedRoute>
          <Route path="/signup">
            <Register
              handleRegister={handleRegister}
              isBadRequest={isBadRequest}
            />
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin} isBadRequest={isBadRequest} />
          </Route>
          <Route exact path="/">
            <Header loggedIn={loggedIn} userEmail={userEmail} />
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
