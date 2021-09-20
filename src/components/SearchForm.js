import React from "react";
import pointer from "../images/pointer.svg";

function SearchForm(props) {
  const [request, setRequest] = React.useState("");
  const [fill, setFill] = React.useState(true);

  function handleChangeRequest(e) {
    if (e.target.value === "") {
      setFill(false);
      setRequest(e.target.value);
      return;
    }
    setRequest(e.target.value);
    setFill(true);
  }

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
          value={request}
          onChange={handleChangeRequest}
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
