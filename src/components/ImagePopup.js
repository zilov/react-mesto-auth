function ImagePopup(props) {
  return(
    <div id="popup-card-image" className={`popup popup_type_card popup_active`}>
      <div className="popup__card-image">
        <button type="button" className="popup__exit-btn" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <h3 className="popup__caption">{props.card.name}</h3>
      </div>
    </div>
  )
}

export default ImagePopup;