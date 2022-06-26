import { useContext } from "react";
import Card from "./Card";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({cards, onEditProfile, onEditAvatar, onAddPlace, 
                onCardClick, onClose, handleCardLike, handleCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  
  return(
    <main id="main">
      <section className="profile">
        <div className="profile__photo" alt="изображение профиля" style={ { backgroundImage: `url(${currentUser.avatar})` }}>
          <button className="profile__edit-photo-btn" onClick={onEditAvatar}/>
        </div>

        <div className="profile__name-status-box">
          <h1 className="profile__name">{currentUser.name}</h1>

          <p className="profile__status">{currentUser.about}</p>

          <button type="button" className="profile__edit-btn" onClick={onEditProfile}></button>
        </div>

        <button type="button" className="profile__add-btn" onClick={onAddPlace}></button>
      </section>

      <section className="cards" aria-label="section">  
        {
          cards.map((cardInfo) => (
            <Card key={cardInfo._id} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} {...cardInfo}/>
          ))
        }
      </section>
    </main>
  )
}

export default Main;