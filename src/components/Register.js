import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Register(props) {
  return (
    <section className="register">
      <img className="register__logo" alt="Логотип диплома." src={logo} />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <p className="register__nomination">Имя</p>
        <input className="register__value" placeholder="Введите имя" value="Андрей" minLength="2" maxLength="40" required type="text"></input>
        <p className="register__nomination">E-mail</p>
        <input className="register__value" placeholder="Введите почту" value="pochta@yandex.ru" minLength="2" required type="email"></input>
        <p className="register__nomination">Пароль</p>
        <input className="register__value" placeholder="Введите пароль" value="parolparol" type="password" minLength="4" required></input>
        <span className="register__error">Что-то пошло не так...</span>
        <button className="register__buttom">Зарегистрироваться</button>
      </form>
      <div className="register__nav">
        <p className="register__question">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__link">Войти</Link>
      </div>
    </section>
  );
}

export default Register;
