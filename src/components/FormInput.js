import React from "react";

function FormInput(props) {
  const value = props.value || '';

  // обновляй значение стейта при изменении инпута (стейт в компоненте попапа)
  const handleInput = (e) => {
    props.setValue(e.target.value);
  }

  return(
    <section className="form__section">
      <input
        type={props.type}
        id={props.id}
        className="form__input"
        minLength="2"
        maxLength={props.maxLength && "1000"}
        value={value}
        placeholder={props.placeholder}
        onChange={handleInput}
        required
      />
      <span className="form__input-err" id={`${props.id}-Error`}></span>
    </section>
  )
}

export default FormInput;