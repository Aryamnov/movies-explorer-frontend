import React from "react";

function Profile({ onSignOut }) {
  return (
    <section className="profile">
        <h1 className="profile__title">Привет, Андрей!</h1>
        <form className="profile__form">
            <div className="profile__name">
                <p className="profile__info">Имя</p>
                <input className="profile__value"></input>
            </div>
            <div className="profile__email">
                <p className="profile__info">E-mail</p>
                <p className="profile__value">pochta@yandex.ru</p>
            </div>
            <button className="profile__edit">Редактировать</button>
        </form>
        <button className="profile__exit" onClick={onSignOut}>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
