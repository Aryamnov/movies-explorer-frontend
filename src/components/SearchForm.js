import React from "react";
import pointer from "../images/pointer.svg";

function SearchForm({
  request,
  fill,
  onEdtitRequest,
  onSubmit
}) {

  return (
    <section>
      <form onSubmit={onSubmit} className="search">
        <input
          name="movie"
          placeholder="Фильм"
          className="search__input"
          type="text"
          minLength="2"
          maxLength="40"
          value={request}
          onChange={onEdtitRequest}
          required
        />
        <button type="submit" className="search__button">
          <img src={pointer} alt="Иконка для старта поиска." className="" />
        </button>
        <span className={fill === false ? "search__error search__error_active" : "search__error"}>Нужно ввести ключевое слово</span>
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
