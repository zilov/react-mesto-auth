import React from "react";

function FormInput({value, type, id, maxLength, placeholder, setValue, auth=false}) {
  
  // обновляй значение стейта при изменении инпута (стейт в компоненте попапа)
  const handleInput = (e) => {
    setValue(e.target.value);
  }

  return(
    <section className="form__section">
      <input
        type={type}
        id={id}
        className={`form__input ${auth && 'form__input_type_auth'}`}
        minLength="2"
        maxLength={maxLength || "1000"}
        value={value}
        placeholder={placeholder}
        onChange={handleInput}
        required
      />
      <span className="form__input-err" id={`${id}-Error`}></span>
    </section>
  )
}

export default FormInput;