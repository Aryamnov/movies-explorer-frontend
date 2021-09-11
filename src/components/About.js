import React from "react";

function About(props) {
  return (
    <section className="about">
        <div className="about__container">
            <h2 className="about__title">О проекте</h2>
            <div className="about__info">
              <div className="about__all">
                <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
                <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
              </div>
              <div className="about__all">
                <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
                <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
              </div>
            </div>
            <div className="about__share">
              <div className="about__backend">
                <div className="about__time about__time_background_green">1 неделя</div>
                <p className="about__type">Back-end</p>
              </div>
              <div className="about__frontend">
                <div className="about__time">4 недели</div>
                <p className="about__type">Front-end</p>
              </div>
            </div>
        </div>
    </section>
  );
}

export default About;
