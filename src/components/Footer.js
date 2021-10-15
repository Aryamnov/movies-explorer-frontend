import React from "react";

function Footer(props) {
  return (
    <section className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__info">
        <div className="footer__copyright">&copy; {new Date().getFullYear()}</div>
        <ul className="footer__links">
          <li className="footer__link"><a className="footer__reference" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
          <li className="footer__link"><a className="footer__reference" href="https://github.com/Aryamnov" target="_blank" rel="noreferrer">Github</a></li>
          <li className="footer__link"><a className="footer__reference" href="https://t.me/aryamnov" target="_blank" rel="noreferrer">Telegram</a></li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
