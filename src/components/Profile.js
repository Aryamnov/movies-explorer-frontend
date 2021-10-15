import React from "react";

function Profile(props) {
  return (
    <section className="profile">
        <h1 className="profile__title">Привет, Андрей!</h1>
        <form className="profile__form">
            <div className="profile__name">
                <p className="profile__info">Имя</p>
                <p className="profile__value">Андрей</p>
            </div>
            <div className="profile__email">
                <p className="profile__info">E-mail</p>
                <p className="profile__value">pochta@yandex.ru</p>
            </div>
            <button className="profile__edit">Редактировать</button>
        </form>
        <button className="profile__exit">Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
