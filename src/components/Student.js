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
              <a className="student__link" href="https://t.me/aryamnov" target="_blank" rel="noreferrer">
                Telegram
              </a>
              <a className="student__link" href="https://github.com/Aryamnov" target="_blank" rel="noreferrer">
                Github
              </a>
            </div>
          </div>
          <img className="student__avatar" alt="Аватарка студента." src={avatar} />
        </div>
        <p className="student__portfolio">Портфолио</p>
        <ul className="student__works">
          <li className="student__work">
            <a className="student__reference" href="https://aryamnov.github.io/how-to-learn/" target="_blank" rel="noreferrer">
              Статичный сайт
            </a>
            <a className="student__arrow" href="https://aryamnov.github.io/how-to-learn/" target="_blank" rel="noreferrer">↗</a>
          </li>
          <li className="student__work">
            <a className="student__reference" href="https://aryamnov.github.io/russian-travel/" target="_blank" rel="noreferrer">
              Адаптивный сайт
            </a>
            <a className="student__arrow" href="https://aryamnov.github.io/russian-travel/" target="_blank" rel="noreferrer">↗</a>
          </li>
          <li className="student__work">
            <a className="student__reference" href="https://mesto-aryamnov.nomoredomains.club/sign-in" target="_blank" rel="noreferrer">
              Одностраничное приложение
            </a>
            <a className="student__arrow" href="https://mesto-aryamnov.nomoredomains.club/sign-in" target="_blank" rel="noreferrer">↗</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Student;
