import React from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "./MoviesCard";
import Preloader from "./Preloader";

function MoviesCardList({
  cards,
  isLoading,
  isNotFound,
  handleSaveCard,
  isSavedMovies,
  handleDeleteCard,
  isShortFilms,
}) {
  const location = useLocation();

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const [isNumberOfMoviesPerPage, setNumberOfMoviesPerPage] = React.useState({
    start: 12,
    added: 3,
  });
  const [isWidth, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    if (window.innerWidth >= 1130)
      setNumberOfMoviesPerPage({ start: 12, added: 3 });
    else if (window.innerWidth >= 740)
      setNumberOfMoviesPerPage({ start: 8, added: 2 });
    else setNumberOfMoviesPerPage({ start: 5, added: 2 });
  }, [isWidth]);

  return (
    <section className="movies">
      {isNotFound.status === true ? (
        <p className="movies__not-found">{isNotFound.message}</p>
      ) : (
        <></>
      )}
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <ul className="movies__content">
            {cards.slice(0, isNumberOfMoviesPerPage.start).map((card) => (
              <MoviesCard
                card={card}
                key={card.id ? card.id : card._id}
                handleSaveCard={handleSaveCard}
                isSavedMovies={isSavedMovies}
                handleDeleteCard={handleDeleteCard}
              />
            ))}
          </ul>
        </>
      )}
      {cards.length > isNumberOfMoviesPerPage.start &&
      location.pathname === "/movies" ? (
        <>
          <button
            className="movies__button"
            onClick={() => {
              setNumberOfMoviesPerPage({
                start:
                  isNumberOfMoviesPerPage.start + isNumberOfMoviesPerPage.added,
                added: isNumberOfMoviesPerPage.added,
              });
            }}
          >
            Ещё
          </button>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}

export default MoviesCardList;
