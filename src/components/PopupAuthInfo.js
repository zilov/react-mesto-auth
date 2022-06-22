function PopupAuthInfo({name, isOpen, onClose, title, icon}) {

  return(
    <div 
      id={`popup-${name}`} 
      className={`popup ${isOpen && "popup_active"}`}
      >
      <div className="popup__window">
        <button type="button" className="popup__exit-btn" onClick={onClose}></button>
        <img className="popup__info-icon" src={icon}/>
        <h2 className="popup__title popup__title_type_auth">{title}</h2>
      </div>
    </div>
  )
}

export default PopupAuthInfo;