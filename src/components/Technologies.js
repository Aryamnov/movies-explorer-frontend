import React from "react";

function Technologies(props) {
  return (
    <section className="technologies">
      <div className="technologies__container">
        <h2 className="technologies__title">Технологии</h2>
        <h3 className="technologies__subtitle">7 технологий</h3>
        <p className="technologies__info">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="technologies__list">
          <li className="technologies__element">HTML</li>
          <li className="technologies__element">CSS</li>
          <li className="technologies__element">JS</li>
          <li className="technologies__element">React</li>
          <li className="technologies__element">Git</li>
          <li className="technologies__element">Express.js</li>
          <li className="technologies__element">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Technologies;
