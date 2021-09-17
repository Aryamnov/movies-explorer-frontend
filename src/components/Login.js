import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Login(props) {
  return (
    <section className="login">
      <img className="login__logo" alt="" src={logo} />
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <p className="login__nomination">E-mail</p>
        <input className="login__value" value="pochta@yandex.ru" minLength="2" required type="email"></input>
        <p className="login__nomination">Пароль</p>
        <input className="login__value" value="" type="password" minLength="4" required></input>
        <button className="login__buttom">Войти</button>
      </form>
      <div className="login__nav">
        <p className="login__question">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__link">Регистрация</Link>
      </div>
    </section>
  );
}

export default Login;
