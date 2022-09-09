import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({onCardLike, onCardClick, onCardDelete, ...cardInfo}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = React.useState(cardInfo.likes.some(like => like === currentUser._id));
  const [likes, setLikes] = React.useState(cardInfo.likes.length);

  function handleLikeClick() {
    onCardLike(cardInfo);
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    setIsLiked(!isLiked);
  }

  function handleDeleteClick() {
    onCardDelete(cardInfo._id);
  }

  function handleClick() {
    onCardClick(cardInfo);
  }

  const isOwn = cardInfo.owner === currentUser._id; 

  return(
    <article className="card">
      {isOwn && <button type="button" className="card__remove-btn" onClick={handleDeleteClick}></button>}
      <div 
        className="card__image" 
        style={{ backgroundImage: `url(${cardInfo.link})`}} 
        onClick={handleClick} alt={cardInfo.name}
      />
      <div className="card__title-like-box">
        <h2 className="card__title">{cardInfo.name}</h2>
        <div className="card__like-counter-box">
          <button 
            type="button" 
            className={
              `card__like-btn 
              ${isLiked ? 'card__like-btn_type_active' : ''}`
            }
            onClick={handleLikeClick}
            >
          </button>
          <p className="card__like-counter">{likes}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;