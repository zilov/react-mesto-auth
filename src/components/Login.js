import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useState } from "react";
import FormInput from "./FormInput";
import { login } from "../utils/Auth"

function Login({setLoggedIn, setIsLoginErrorPopupOpen}) {
  const currentUser = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginError = () => {
    setIsLoginErrorPopupOpen(true)
    setIsLoading(false);
  }

  const handleLoginSubmit = (e) => {
    // сравниваем данные с данными сервера, если успешно залогинились - обновляем токен
    // если не успешно - открываем попап ошибки
    e.preventDefault();
    setIsLoading(true);
    login(email, password).then((res) => {
      currentUser.email = email;
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