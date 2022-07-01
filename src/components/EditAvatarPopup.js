import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  // при сабмите возьми значения стейта (обновляются в formInput) и отправь через api на бек (отправка в App.js)
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar( link )
  }

  // начальный стейт аватара цепляется из данных юзера
  const [link, setLink] = React.useState('');

  // при обновлении данных пользователя обнови стейт
  React.useEffect(() => {
    if (isOpen) {
      setLink('');
    }
  }, [isOpen]);

  return( 
    <PopupWithForm
      title="Обновить аватар"
      name="change-profile-photo"
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      inputList={[
        {
          type: "url",
          id:"avatarLinkInput",
          placeholder:"Ссылка на картинку",
          value: link,
          setValue: setLink,
        }
      ]}
    />
  )
}

export default EditAvatarPopup;