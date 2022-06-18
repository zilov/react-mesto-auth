function Header({logo, loggedIn}) {
  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />
      {loggedIn ? {/*logged in header style with email and logout button*/} : {/* register/login header style*/}}
    </header>
  );
}

export default Header;