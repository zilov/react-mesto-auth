import logo from '../images/logo.svg';
import '../App.css';
import api from "../utils/Api";
import Header  from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { checkToken } from '../utils/Auth';
import PopupAuthInfo from './PopupAuthInfo';
import iconError from '../images/popup_auth-info-error.svg';
import iconSuccess from '../images/popup_auth-info-success.svg';
import { login, register } from "../utils/Auth";
import Cookies from 'js-cookie';

function App() {

  // register / login states and functions

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(Cookies.get('userEmail') || '');
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const jwt = Cookies.get('jwt')
    if (jwt) {
      // trying to check token on backend => line 114
      api.getProfileInfo()
        .then(() => {setLoggedIn(true)})
        .catch(() => {setLoggedIn(false)})
    } else {
      setLoggedIn(false);
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    } else {
      history.push('/signin');
    }
  }, [loggedIn]);


  const handleLoginError = () => {
    setLoginSuccess(false);
    setIsRegisterPopupOpen(true);
    setIsFormLoading(false);
  }

  const handleLoginSubmit = (email, password) => {
    // сравниваем данные с данными сервера, если успешно залогинились - обновляем токен
    // если не успешно - открываем попап ошибки
    setIsFormLoading(true);
    login(email, password)
      .then((res) => {
        Cookies.set('userEmail', email, {sameSite: false});
        setUserEmail(email);
        setLoggedIn(true);
      })
      .catch(() => handleLoginError())
      .finally(setIsFormLoading(false));
  }

  const handleRegisterError = () => {
    setIsFormLoading(false);
    // Открыть попап ошибки
    setLoginSuccess(false);
    setIsRegisterPopupOpen(true);
  }

  const handleRegisterSuccess = () => {
    setIsFormLoading(false);
    // открыть попап успешной регистрации
    setLoginSuccess(true);
    setIsRegisterPopupOpen(true);
  }

  const handleRegisterSubmit = (email, password) => {
    // сравниваем данные с данными сервера
    setIsFormLoading(true);
    register(email, password).then((res) => {
      if (res.status === 200) {
        handleRegisterSuccess(); 
      }
    })
    .catch(() => handleRegisterError())
    .finally(setIsFormLoading(false));
  }

  const handleSuccessRegisterPopupClose = () => {
    history.push('/signin');
    closeAllPopups();
  } 

  const handleLogout = () => {
    Cookies.remove('jwt');
    Cookies.remove('userEmail');
  }

  // main functionality states and functions
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      api.getProfileInfo().then((res) => {
        setCurrentUser(res);
      }).catch((err) => {
        console.log(`Error in getting initial user data ${err}`);
      })
  
      api.getCardsList().then((res) => {
        setCards(res.map(item => item))
      }).catch((err) => {
        console.log(`Error in getting initial card list ${err}`)
      })
    }
  }, [loggedIn]);
  
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }
  
  function handleEditProfileClick(event) {
    setEditProfilePopupOpen(true)
  }
  
  function handleEditPlaceClick() {
    setAddCardPopupOpen(true)
  }

  function handleCardClick(cardInfo) {
    setSelectedCard(cardInfo);
  }
  
  function closeAllPopups() {
    setIsFormLoading(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setSelectedCard(null);
    setIsRegisterPopupOpen(false);
  }

  function handleUpdateUser(name, about) {
    setIsFormLoading(true);
    api.editProfileInfo(name, about).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    }).catch((err) => {console.log(`Error in update user data ${err}`)})
    .finally(setIsFormLoading(false))
  }

  function handleUpdateAvatar(link) {
    setIsFormLoading(true);
    api.editProfilePhoto(link).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    }).catch((err) => {console.log(`Error in avatar update ${err}`)})
    .finally(setIsFormLoading(false))
  }

  function handleAddPlace(cardName, cardLink) {
    setIsFormLoading(true);
    api.addNewCard(cardName, cardLink).then((newCardInfo) => {
      setCards([newCardInfo, ...cards]);
      closeAllPopups();
    }).catch((err) => {console.log(`Error in adding new card ${err}`)})
    .finally(setIsFormLoading(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => 
        state.map((card) => card._id === newCard._id ? newCard : card)
      )})
      .catch((err) => {console.log(`Error in card like handle ${err}`)});
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then((deletedCard) => {
      setCards((state) => state.filter((card) => card._id !== cardId))
    }).catch((err) => {console.log(`Error in card delete handle ${err}`)})
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className='page'>
          <Header 
            logo={logo}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            onLogout={handleLogout}
            email={userEmail}
          /> 
          <Switch>
            <Route path="/signup">
              <Register 
                isLoading={isFormLoading}
                handleRegisterSubmit={handleRegisterSubmit}
              />
            </Route>
            <Route path="/signin">
              <Login 
                isLoading={isFormLoading}
                handleLoginSubmit={handleLoginSubmit} 
              />
            </Route>
            <ProtectedRoute
                path='/'
                component={Main} 
                loggedIn={loggedIn}
                cards={cards}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleEditPlaceClick}
                onCardClick={handleCardClick}
                popupOpenStates= {{
                  editProfile: isEditProfilePopupOpen,
                  editAvatar: isEditAvatarPopupOpen,
                  addCard: isAddCardPopupOpen,
                  cardPopup: selectedCard,
                }}
            />
            <Route path='*'>
              {loggedIn ? <Redirect to="/"/> : <Redirect to="/signin"/>}
            </Route>
          </Switch>    
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isFormLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isFormLoading}
          />
          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            isLoading={isFormLoading}
          />
          <PopupAuthInfo
            isOpen={isRegisterPopupOpen}
            onClose={loginSuccess ? handleSuccessRegisterPopupClose : closeAllPopups}
            name='register-info'
            icon={loginSuccess ? iconSuccess : iconError}
            title={loginSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз!"}
          />
          { selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
          {loggedIn && <Footer/>}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
