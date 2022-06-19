function Header({logo, loggedIn}) {
  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />
      {loggedIn ? <></> : <></>}
    </header>
  );
}

export default Header;