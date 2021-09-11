import React from "react";
import logo from "../images/landing-logo.svg";

function Title(props) {
  return (
    <section className="title">
        <div className="title__container">
            <h1 className="title__content">Учебный проект студента факультета Веб-разработки.</h1>
            <div className="title__logo-container">
                <img className="title__logo" alt="" src={logo} />
            </div>
        </div>
    </section>
  );
}

export default Title;
