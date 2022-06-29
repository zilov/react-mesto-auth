import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, setIsLoading }) {

  // при сабмите возьми значения стейтов (обновляются в formInput) и отправь через api на бек (отправка в App.js)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onAddPlace(cardName, cardLink).finally(setIsLoading(false));
  }

  React.useEffect(() => {
    if (isOpen) {
      setCardName('');
      setCardLink('');
    }}, [isOpen]
  )

  // начальные стейты
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  return(
    <PopupWithForm
      title="Новое место"
      name="add-card"
      submitBtnText="Создать"
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
      loadingText="Создаю..."
      onSubmit={handleSubmit}
      inputList={[
        {
          type: "text",
          id:"cardNameInput",
          maxLength:"30",
          placeholder:"Название",
          value: cardName,
          setValue: setCardName,
        },
        {
          type: "url",
          id:"cardLinkInput",
          placeholder:"Ссылка на картинку",
          value: cardLink,
          setValue: setCardLink,
        }
      ]}
    />
  )
}

export default AddPlacePopup;