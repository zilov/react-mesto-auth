import { useState } from "react";
import FormInput from "./FormInput";

function Login() {

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = () => {
    // сравниваем данные с данными сервера
    setIsLoading(true);
  }

  return(
    <div> 
      <h2 className="login__title">Вход</h2>
        <form className="form" id='form-login' onSubmit={handleLoginSubmit} noValidate>
          <div className="form__inputs-box">
            <FormInput 
              type= "email"
              id="loginEmailInput"
              placeholder="Email"
              setValue= {setEmail}
            />
            <FormInput 
              type= "email"
              id="loginPasswordInput"
              placeholder="Пароль"
              setValue= {setPassword}
            />
          </div>
          <button type="submit" className="form__submit-btn form__submit-btn_type_login">{(isLoading && 'Вхожу...') || 'Войти'}</button>
        </form>
    </div>
  )
}

export default Login;