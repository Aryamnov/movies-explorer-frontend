import React from "react";
import MoviesCard from "./MoviesCard";
import Preloader from "./Preloader";

function MoviesCardList({ cards, isLoading }) {

  console.log(cards.length);

  const newCard = [];

  if (cards.length !== 0) {
    for (let i=0; i < 6; i++) {
      newCard[i] = cards[i];
    }
  }
  console.log(newCard);

  return (
    <section className="movies">
      {isLoading ? (<Preloader />) : 
      (<><ul className="movies__content">
        {newCard.map((card) => (
          <MoviesCard card={card} key={card.id} />
        ))}
      </ul>
      <button className="movies__button">Ещё</button></>)}
    </section>
  );
}

export default MoviesCardList;
