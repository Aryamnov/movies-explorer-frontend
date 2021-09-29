import React from "react";
import { Route, Switch } from "react-router-dom";
import checkMark from "../images/check-mark.svg";
import away from "../images/delete.svg";

function MoviesCard({ card, handleSaveCard, isSavedMovies, handleDeleteCard }) {
  const urlTrailer = "https://api.nomoreparties.co" + card.image.url;

  const [isSavedCard, setSavedCard] = React.useState(false);

  React.useEffect(() => {
    if (isSavedMovies) {
      setSavedCard(isSavedMovies.some((movie) => card.id === movie.movieId));
    }
  }, [card, isSavedMovies]);

  const handleSendSaveCard = () => {
    !isSavedCard ? handleSaveCard(card) : handleDeleteCard(card);
  };

  const handleDeleteSaveCard = () => {
    handleDeleteCard(card);
  };

  return (
    <li className="movie">
      <div className="movie__contant">
        <Switch>
          <Route path="/movies">
            <a
              className="movie__link"
              href={card.trailerLink}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="movie__image"
                alt="ПРимер для верстки."
                src={urlTrailer}
              />
            </a>
            <button
              className={
                isSavedCard === true
                  ? "movie__save movie__save_active"
                  : "movie__save"
              }
              onClick={handleSendSaveCard}
            >
              {isSavedCard === true ? (
                <img
                  src={checkMark}
                  alt="Иконка для сохранения и отображения состояния сохранения."
                />
              ) : (
                "Сохранить"
              )}
            </button>
          </Route>
          <Route path="/saved-movies">
            <a
              className="movie__link"
              href={card.trailer}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="movie__image"
                alt="Логотип фильма."
                src={card.image}
              />
            </a>
            <button
              className="movie__save movie__save_close"
              onClick={handleDeleteSaveCard}
            >
              <img src={away} alt="Иконка удаления карточки." />
            </button>
          </Route>
        </Switch>
      </div>
      <div className="movie__info">
        <h2 className="movie__name">{card.nameRU}</h2>
        <p className="movie__time">{`${Math.floor(card.duration / 60)} ч ${
          card.duration % 60
        } м`}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
