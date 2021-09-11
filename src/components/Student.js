import React from "react";
import avatar from "../images/foto_avatar.jpg";

function Student(props) {
  return (
    <section className="student">
      <div className="student__container">
        <h2 className="student__title">Студент</h2>
        <div className="student__info">
          <div className="student__text">
            <h3 className="student__name">Андрей</h3>
            <p className="student__short">Фронтенд-разработчик, 28 лет</p>
            <p className="student__about">
              Я родился и живу в Новосибирске, закончил инженерно-экологический
              факультет НГАСУ, специальность "Тепло- газоснабжение и
              вентиляция". Увлекаюсь велоспортом. С 2015 года работаю в компании
              «Неватом». После того, как прошёл курсы НГУ и Яндекс.Практикума,
              ищу работу веб-разработчиком.
            </p>
            <div className="student__links">
              <a className="student__link" href="/#">
                Facebook
              </a>
              <a className="student__link" href="/#">
                Github
              </a>
            </div>
          </div>
          <img className="student__avatar" alt="" src={avatar}></img>
        </div>
        <p className="student__portfolio">Портфолио</p>
        <ul className="student__works">
          <li className="student__work">
            <a className="student__reference" href="/#">
              Статичный сайт
            </a>
            <a className="student__arrow" href="/#">↗</a>
          </li>
          <li className="student__work">
            <a className="student__reference" href="/#">
              Адаптивный сайт
            </a>
            <a className="student__arrow" href="/#">↗</a>
          </li>
          <li className="student__work">
            <a className="student__reference" href="/#">
              Одностраничное приложение
            </a>
            <a className="student__arrow" href="/#">↗</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Student;
