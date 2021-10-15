import React from "react";
import { Route, Link, Switch, NavLink } from "react-router-dom";
import close from "../images/close.svg";
import logoAccount from "../images/account-logo.svg";

function Navigation(props) {
  return (
    <section className={`menu ${props.isOpen ? `menu_active` : ``}`}>
        <div className="menu__container">
          <button className="menu__close" onClick={props.onClose}><img src={close} alt="Иконка закрытия." className="menu__cross" /></button>
          <ul className="menu__list">
              <li className="menu__element"><NavLink exact to="/" className="menu__link" activeClassName="menu__link_active">Главная</NavLink></li>
              <li className="menu__element"><NavLink to="/movies" className="menu__link" activeClassName="menu__link_active">Фильмы</NavLink></li>
              <li className="menu__element"><NavLink to="/saved-movies" className="menu__link" activeClassName="menu__link_active">Сохранённые фильмы</NavLink></li>
          </ul>
          <ul className="menu__account">
              <Link className="menu__name" to="/profile">Аккаунт</Link>
              <Link className="" to="/profile"><div className="menu__icon-background"><img className="menu__icon" alt="Иконка аккаунта." src={logoAccount} /></div></Link>
          </ul>
        </div>
    </section>
  );
}

export default Navigation;
