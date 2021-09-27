import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import {useFormWithValidation} from "../hooks/useForm";

function Login({ handleLogin, isBadRequest }) {
  const {values, handleChange, errors, isValid} = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = values;
    handleLogin(email, password);
  };

  return (
    <section className="login">
      <img className="login__logo" alt="Логотип диплома." src={logo} />
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <p className="login__nomination">E-mail</p>
        <input className="login__value" minLength="2" required name="email" type="email" value={values.email || ""} onChange={handleChange}></input>
        <span className="login__error">{errors.email ? "Введите email" : ""}</span>
        <p className="login__nomination">Пароль</p>
        <input className="login__value" name="password" type="password" minLength="4" value={values.password || ""} required onChange={handleChange}></input>
        <span className="login__error">{errors.password}</span>
        <button className="login__buttom" disabled={!isValid}>Войти</button>
        <span className="login__error">{isBadRequest ? isBadRequest : ""}</span>
      </form>
      <div className="login__nav">
        <p className="login__question">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__link">Регистрация</Link>
      </div>
    </section>
  );

  /*const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = data;
    handleLogin(email, password);
  };

  return (
    <section className="login">
      <img className="login__logo" alt="Логотип диплома." src={logo} />
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <p className="login__nomination">E-mail</p>
        <input className="login__value" minLength="2" required name="email" type="email" value={data.email} onChange={handleChange}></input>
        <p className="login__nomination">Пароль</p>
        <input className="login__value" name="password" type="password" minLength="4" value={data.password} required onChange={handleChange}></input>
        <button className="login__buttom">Войти</button>
      </form>
      <div className="login__nav">
        <p className="login__question">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__link">Регистрация</Link>
      </div>
    </section>
  );*/



}

export default Login;
