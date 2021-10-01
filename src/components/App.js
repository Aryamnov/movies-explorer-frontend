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
  const [isStartSavedMovies, setStartSavedMovies] = React.useState([]);
  const [isShortFilms, setShortFilms] = React.useState(false);
  const [isApiMovies, setApiMovies] = React.useState([]);
  const [isSuccess, setSuccess] = React.useState("");
  const [isBlockButton, setBlockButton] = React.useState(false);

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

  const saveApiMovies = () => {
    moviesApi
      .getCard()
      .then((movies) => {
        setApiMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  React.useEffect(() => {
    tokenCheck();
    saveApiMovies();
  }, []);

  const handleChangeProfile = (name, email) => {
    setBlockButton(true);
    setSuccess("");
    updateUserInfo(name, email)
      .then((res) => {
        setBadRequest("");
        setSuccess("Данные успешно изменены");
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
      })
      .finally(() => setBlockButton(false));
  };

  const handleEdit = () => {
    setEditProfile(!isEditProfile);
    setSuccess("");
  };

  const handleSaveCard = (card) => {
    setBlockButton(true);
    saveCard(card)
      .then((res) => {
        getSavedCards();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setBlockButton(false));
  };

  const handleDeleteCard = (card) => {
    setBlockButton(true);
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
      })
      .finally(() => setBlockButton(false));
  };

  const handleShortMovies = () => {
    setShortFilms(!isShortFilms);
  };

  const handleRegister = (name, email, password) => {
    setBlockButton(true);
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
      })
      .finally(() => setBlockButton(false));
  };

  const handleLogin = (email, password) => {
    setBlockButton(true);
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
      })
      .finally(() => setBlockButton(false));
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  };

  React.useEffect(() => {
    if (localStorage.getItem("cards"))
      setCards(JSON.parse(localStorage.getItem("cards")));
    if (isShortFilms) setCards(cards.filter(function (element) {
      return element.duration < 41;
    }));
  }, [isShortFilms]);

  React.useEffect(() => {
    setSavedMovies(isStartSavedMovies);
    if (isShortFilms) setSavedMovies(isSavedMovies.filter(function (element) {
      return element.duration < 41;
    }));
  }, [isShortFilms])

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
    const moviesFilter = isApiMovies.filter(function (element) {
      return element.nameRU.toLowerCase().includes(request.toLowerCase());
    });
    if (moviesFilter.length === 0)
      setNotFound({ status: true, message: "Ничего не найдено" });
    localStorage.setItem("cards", JSON.stringify(moviesFilter));
    setCards(moviesFilter);
    if (isApiMovies.length === 0) setNotFound({
      status: true,
      message:
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
    });
    setLoading(false);
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
              handleShortMovies={handleShortMovies}
            />
            <MoviesCardList
              cards={cards}
              isLoading={isLoading}
              isNotFound={isNotFound}
              handleSaveCard={handleSaveCard}
              isSavedMovies={isSavedMovies}
              handleDeleteCard={handleDeleteCard}
              isBlockButton={isBlockButton}
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
              handleShortMovies={handleShortMovies}
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
              isSuccess={isSuccess}
              isBlockButton={isBlockButton}
            />
            <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
          </ProtectedRoute>
          <Route path="/signup">
            <Register
              handleRegister={handleRegister}
              isBadRequest={isBadRequest}
              isBlockButton={isBlockButton}
            />
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin} isBadRequest={isBadRequest} isBlockButton={isBlockButton} />
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
