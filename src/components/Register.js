import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import { useState } from "react";

function Register({ isLoading, handleRegisterSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegisterSubmit(email, password);
    setEmail('');
    setPassword('');
  }

  return(
    <div className="login"> 
      <h2 className="login__title">Регистрация</h2>
      <form className="form" id='form-register' onSubmit={handleSubmit} noValidate>
          <div className="form__inputs-box">
            <FormInput 
              value={email}
              type= "email"
              id="loginEmailInput"
              placeholder="Email"
              setValue= {setEmail}
              auth={true}
            />
            <FormInput
              value={password}
              type= "password"
              id="loginPasswordInput"
              placeholder="Пароль"
              setValue= {setPassword}
              auth={true}
            />
          </div>
          <button type="submit" className="form__submit-btn form__submit-btn_type_login">
            {(isLoading && 'Регистрирую...') || 'Зарегистрироваться'}
          </button>
        </form>
        <p className="login__subtitle">
          Уже зарегистрированы?
          <Link className="login__link" to="/signin"> Войти</Link>
        </p>
    </div>
  )
}

export default Register;