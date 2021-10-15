import React from "react";
import { Link } from "react-router-dom";

function NotFoind() {
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__subtitle">Страница не найдена</h2>
      <Link to="/" className="not-found__link">Назад</Link>
    </section>
  );
}

export default NotFoind;
