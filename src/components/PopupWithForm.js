import FormInput from "./FormInput";

function PopupWithForm({submitBtnText="Сохранить", isLoading, loadingText="Сохраняю...", inputList=[], ...props}) {

  return(
    <div 
      id={`popup-${props.name}`} 
      className={`popup ${props.isOpen && "popup_active"}`}
      >
      <div className="popup__window">
        <button type="button" className="popup__exit-btn" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="form" id={`form-${props.name}`} onSubmit={props.onSubmit} noValidate>
          <div className="form__inputs-box">
            {
              inputList.map(({id, ...inputProps}) => (
                <FormInput key={id} {...inputProps}/>
              ))
            }
          </div>
          <button type="submit" className="form__submit-btn">{(isLoading && loadingText) || submitBtnText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;