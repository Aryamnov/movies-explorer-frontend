import React from "react";
import MoviesCard from "./MoviesCard";

function MoviesCardList({cards}) {
  return (
    <section className="movies">
      <ul className="movies__content">
        {/*<MoviesCard />
        <MoviesCard saved={true} />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />*/}
        {cards.map((card) => (
            <MoviesCard
              card={card}
            />
          ))}
      </ul>
      <button className="movies__button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
