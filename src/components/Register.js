import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import {useFormWithValidation} from "../hooks/useForm";

function Register({ handleRegister, isBadRequest }) {
  const {values, handleChange, errors, isValid} = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    handleRegister(name, email, password);
  };


  /*const [data, setData] = React.useState({
    name: "",
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
    const { name, email, password } = data;
    handleRegister(name, email, password);
  };*/

  return (
    <section className="register">
      <img className="register__logo" alt="Логотип диплома." src={logo} />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <p className="register__nomination">Имя</p>
        <input className="register__value" placeholder="Введите имя" minLength="2" maxLength="40" required type="text" value={values.name || ""} name="name" onChange={handleChange}></input>
        <span className="register__error">{errors.name}</span>
        <p className="register__nomination">E-mail</p>
        <input className="register__value" placeholder="Введите почту" minLength="2" required type="email" value={values.email || ""} name="email" onChange={handleChange}></input>
        <span className="register__error">{errors.email ? "Введите email" : ""}</span>
        <p className="register__nomination">Пароль</p>
        <input className="register__value" placeholder="Введите пароль" type="password" minLength="4" value={values.password || ""} name="password" required onChange={handleChange}></input>
        <span className="register__error">{errors.password}</span>
        <span className="register__error"></span>
        <button className="register__buttom" disabled={!isValid}>Зарегистрироваться</button>
        <span className="register__bad-request">{isBadRequest ? isBadRequest : ""}</span>
      </form>
      <div className="register__nav">
        <p className="register__question">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__link">Войти</Link>
      </div>
    </section>
  );
}

export default Register;
