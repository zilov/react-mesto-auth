import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import { useState } from "react";
import { register } from "../utils/Auth"

function Register({setIsRegisterSuccessPopupOpen, setIsLoginErrorPopupOpen}) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterError = () => {
    setIsLoading(false);
    // Открыть попап ошибки
    setIsLoginErrorPopupOpen(true);
  }

  const handleSuccessfulRegister = () => {
    setIsLoading(false);
    // открыть попап успешной регистрации
    setIsRegisterSuccessPopupOpen(true)
  }

  const handleRegisterSubmit = (e) => {
    // сравниваем данные с данными сервера
    e.preventDefault();
    setIsLoading(true);
    register(email, password).then(() => {
      setEmail('');
      setPassword('');
      handleSuccessfulRegister();
      //перенаправляем на страницу логина
      // setTimeout(() => {
      //   closePopups()
      //   history.push('/signin')
      // }, 3000);
    })
    .catch(() => handleRegisterError());
  }

  return(
    <div className="login"> 
      <h2 className="login__title">Регистрация</h2>
      <form className="form" id='form-register' onSubmit={handleRegisterSubmit} noValidate>
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