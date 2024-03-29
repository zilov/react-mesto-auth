import { NavLink } from "react-router-dom";

function Header({logo, loggedIn, setLoggedIn, onLogout, email}) {
  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />
      {loggedIn 
        ?
          <>
            <p className="header__email">{email}</p>
            <NavLink 
              exact to="/" 
              activeStyle={{color:'#A9A9A9'}}
              className={isActive => 'header__link' + (isActive ? ' header__link_active' : '')}
              onClick={() => {
                setLoggedIn(false);
                onLogout();
              }}
            >Выйти</NavLink>
          </>
        :
          <>
          <NavLink
            to="/signup"
            className={isActive => 'header__link' + (isActive ? '' : ' header__link_active')}
          >Регистрация</NavLink>
          <NavLink
            to="/signin"
            className={isActive => 'header__link' + (isActive ? '' : ' header__link_active')}
          >Войти</NavLink>
          </>
      } 
    </header>
  );
}

export default Header;