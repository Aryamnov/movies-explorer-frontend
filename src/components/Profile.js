import React from "react";
import { useFormWithValidation } from "../hooks/useForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Profile({
  onSignOut,
  handleChangeProfile,
  isEditProfile,
  handleEdit,
  isBadRequest,
}) {
  const { resetForm, values, handleChange, errors } =
    useFormWithValidation();

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const handleSubmitEditProfile = (e) => {
    e.preventDefault();
    handleChangeProfile(values.name, values.email);
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" onSubmit={handleSubmitEditProfile}>
        <div className="profile__content">
          <div className="profile__name">
            <p className="profile__info">Имя</p>
            <input
              className="profile__value"
              minLength="2"
              maxLength="40"
              required
              name="name"
              type="text"
              value={values.name || ""}
              onChange={handleChange}
              disabled={!isEditProfile}
            ></input>
          </div>
          <span className="profile__error">{errors.name}</span>
        </div>
        <div className="profile__email">
          <p className="profile__info">E-mail</p>
          <input
            className="profile__value"
            minLength="2"
            required
            name="email"
            type="email"
            value={values.email || ""}
            onChange={handleChange}
            disabled={!isEditProfile}
          ></input>
        </div>
        <span className="profile__error">
          {errors.email ? "Введите email" : ""}
        </span>
        {isEditProfile ? (
          <button className="profile__submit">Сохранить</button>
        ) : (
          <></>
        )}
        <span className="profile__bad-request">
          {isBadRequest ? isBadRequest : ""}
        </span>
      </form>
      {isEditProfile ? (
        <></>
      ) : (
        <button className="profile__edit" onClick={handleEdit}>
          Редактировать
        </button>
      )}
      {!isEditProfile ? (
        <button className="profile__exit" onClick={onSignOut}>
          Выйти из аккаунта
        </button>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Profile;
