import React from "react";
import { Route, Switch } from "react-router-dom";
import movieExample from "../images/movie-example.jpg";
import checkMark from "../images/check-mark.svg";
import away from "../images/delete.svg";

function MoviesCard(props) {
  return (
    <li className="movie">
      <div className="movie__contant">
        <a className="movie__link" href="https://www.youtube.com/watch?v=YjSSubEUY3E" target="_blank" rel="noreferrer"><img className="movie__image" alt="ПРимер для верстки." src={movieExample} /></a>
        <Switch>
          <Route path="/movies">
            <button className={props.saved === true ? "movie__save movie__save_active" : "movie__save"}>{props.saved === true ? <img src={checkMark} alt="Иконка для сохранения и отображения состояния сохранения."/> : "Сохранить"}</button>
          </Route>
          <Route path="/saved-movies">
            <button className="movie__save movie__save_close"><img src={away} alt="Иконка закрытия."/></button>
          </Route>
        </Switch>
      </div>
      <div className="movie__info">
        <h2 className="movie__name">33 слова о дизайне</h2>
        <p className="movie__time">1ч 17м</p>
      </div>
    </li>
  );
}

export default MoviesCard;