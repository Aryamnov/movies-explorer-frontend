import React from "react";
import { Route, Link, Switch, NavLink } from "react-router-dom";
import logo from "../images/logo.svg";
import logoAccount from "../images/account-logo.svg";

function Header(props) {
  return (
    <header className={props.backgroundColor === "gray" ? "header header_background_gray" : "header"}>
      <div className="header__container">
          <img className="header__logo" alt="" src={logo} />
          <Switch>
            <Route exact path="/">
              <div className="header__buttoms">
                  <Link className="header__registration">Регистрация</Link>
                  <Link className="header__login"><button className="header__buttom">Войти</button></Link>
              </div>
            </Route>
            <Route path="*">
              <ul className="header__nav">
                <NavLink to="/movies" className="header__link" activeClassName="header__link_active">Фильмы</NavLink>
                <NavLink to="/saved-movies" className="header__link" activeClassName="header__link_active">Сохранённые фильмы</NavLink>
              </ul>
              <ul className="header__account">
                <Link className="header__name">Аккаунт</Link>
                <Link className=""><div className="header__icon-background"><img className="header__icon" alt="" src={logoAccount} /></div></Link>
              </ul>
            </Route>
          </Switch>
      </div>
    </header>
  );
}

export default Header;