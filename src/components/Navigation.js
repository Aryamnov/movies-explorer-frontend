import React from "react";
import { Route, Link, Switch, NavLink } from "react-router-dom";
import close from "../images/close.svg";
import logoAccount from "../images/account-logo.svg";

function Navigation(props) {
  return (
    <section className="menu">
        <button className="menu__close"><img src={close} alt="" className="" /></button>
        <ul className="menu__list">
            <NavLink to="/" className="menu__link" activeClassName="menu__link_active">Главная</NavLink>
            <NavLink to="/movies" className="menu__link" activeClassName="menu__link_active">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="menu__link" activeClassName="menu__link_active">Сохранённые фильмы</NavLink>
        </ul>
        <ul className="menu__account">
            <Link className="menu__name" to="/profile">Аккаунт</Link>
            <Link className="" to="/profile"><div className="menu__icon-background"><img className="menu__icon" alt="" src={logoAccount} /></div></Link>
        </ul>
    </section>
  );
}

export default Navigation;
