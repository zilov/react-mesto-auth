import { useState } from "react";
import FormInput from "./FormInput";

function Login({ isLoading, handleLoginSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit(email, password);
    setEmail('');
    setPassword('');
  }

  return(
    <div className="login"> 
      <h2 className="login__title">Вход</h2>
        <form className="form" id='form-login' onSubmit={handleSubmit} noValidate>
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