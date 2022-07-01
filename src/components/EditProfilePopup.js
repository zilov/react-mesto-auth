import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  
  // подтягиваю данные юзера из контекста
  const currentUser = React.useContext(CurrentUserContext);

  // при сабмите возьми значения стейтов (обновляются в formInput) и отправь через api на бек (отправка в App.js)
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser( name, description )
  }

  // начальные стейты для имени и описания цепляются от данных юзера
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  // при обновлении данных пользователя или открытии попапа обнови стейты
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return(
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      inputList={[
        {
          type: "text",
          id:"nameInput",
          maxLength:"40",
          placeholder:"Имя",
          value: name || '',
          setValue: setName,
        },
        {
          type: "text",
          id:"statusInput",
          maxLength:"200",
          placeholder:"Статус",
          value: description || '',
          setValue: setDescription,
        }
      ]}
    />
  )
}

export default EditProfilePopup;