import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import { useState } from "react";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterSubmit = () => {
    // сравниваем данные с данными сервера
    setIsLoading(true);
  }

  return(
    <div> 
      <h2 className="login__title">Регистрация</h2>
      <form className="form" id='form-register' onSubmit={handleRegisterSubmit} noValidate>
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
          <button type="submit" className="form__submit-btn form__submit-btn_type_login">
            {(isLoading && 'Регистрирую...') || ''}
          </button>
        </form>
        <p>
          Уже зарегистрированы?
          <Link to="/signin">Войти</Link>
        </p>
    </div>
  )
}

export default Register;