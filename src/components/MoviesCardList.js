import React from "react";
import MoviesCard from "./MoviesCard";

function MoviesCardList(props) {
  return (
    <section className="movies">
      <div className="movies__content">
        <MoviesCard />
        <MoviesCard saved={true} />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </div>
      <button className="movies__button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
