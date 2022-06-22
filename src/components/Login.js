import { useState } from "react";
import FormInput from "./FormInput";
import { login } from "../utils/Auth"
import { Link } from "react-router-dom";

function Login({setLoggedIn}) {

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginError = () => {
    setIsLoading(false);
    console.log('error in login');
    return;
  }

  const handleLoginSubmit = (e) => {
    // сравниваем данные с данными сервера, если успешно залогинились - обновляем токен
    // если не успешно - открываем попап ошибки
    e.preventDefault();
    setIsLoading(true);
    console.log(email, password);
    login(email, password).then((res) => {
      setEmail('');
      setPassword('');
      setLoggedIn(true);
      localStorage.setItem('jwt', res.token);
    }).catch(() => handleLoginError());
  }

  return(
    <div className="login"> 
      <h2 className="login__title">Вход</h2>
        <form className="form" id='form-login' onSubmit={handleLoginSubmit} noValidate>
          <div className="form__inputs-box">
            <FormInput
              value={email}
              type= "email"
              id="loginEmailInput"
              placeholder="Email"
              maxLength='100'
              setValue= {setEmail}
              auth={true}
            />
            <FormInput
              value={password}
              type= "password"
              id="loginPasswordInput"
              placeholder="Пароль"
              maxLength='100'
              setValue= {setPassword}
              auth={true}
            />
          </div>
          <button type="submit" className="form__submit-btn form__submit-btn_type_login">{(isLoading && 'Вхожу...') || 'Войти'}</button>
        </form>
    </div>
  )
}

export default Login;