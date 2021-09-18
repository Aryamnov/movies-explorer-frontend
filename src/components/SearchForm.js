import React from "react";
import pointer from "../images/pointer.svg";

function SearchForm(props) {
  return (
    <section>
      <form className="search">
      <input
        name="movie"
        placeholder="Фильм"
        className="search__input"
        type="text"
        minLength="2"
        maxLength="40"
        required
      /><button type="submit" className="search__button"><img src={pointer} alt="Иконка для старта поиска." className="" /></button>
      <div className="search__container">
        <label className="search__check">
            <input className="search__checkbox" type="checkbox" />
            <span className="search__box" />
            Короткометражки
        </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
