import React from "react";
import pointer from "../images/pointer.svg";

function SearchForm({
  request,
  fill,
  onEdtitRequest,
  onSubmit,
  handleShortMovies,
  isShortFilms,
}) {
  return (
    <section>
      <form onSubmit={onSubmit} className="search">
        <input
          name="movie"
          placeholder="Фильм"
          className="search__input"
          type="text"
          maxLength="40"
          value={request}
          onChange={onEdtitRequest}
        />
        <button type="submit" className="search__button">
          <img src={pointer} alt="Иконка для старта поиска." className="" />
        </button>
        <span
          className={
            fill === false
              ? "search__error search__error_active"
              : "search__error"
          }
        >
          Нужно ввести ключевое слово
        </span>
        <div className="search__container">
          <label className="search__check">
            <input
              className="search__checkbox"
              type="checkbox"
              onChange={handleShortMovies}
            />
            <span className="search__box" />
            Короткометражки
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
