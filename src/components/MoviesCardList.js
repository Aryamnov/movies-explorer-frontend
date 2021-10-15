import React from "react";
import MoviesCard from "./MoviesCard";

function MoviesCardList(props) {
  return (
    <section className="movies">
      <ul className="movies__content">
        <MoviesCard />
        <MoviesCard saved={true} />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className="movies__button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
