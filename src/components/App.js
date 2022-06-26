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
import iconLoginError from '../images/popup_auth-info-error.svg';
import iconRegisterSuccess from '../images/popup_auth-info-success.svg';

function App() {

  // register / login states and functions

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterSuccessPopupOpen, setIsRegisterSuccessPopupOpen] = useState(false);
  const [isLoginErrorPopupOpen, setIsLoginErrorPopupOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  const history = useHistory();

  useEffect(() => {
    checkToken().then(() => setLoggedIn(true))
    .catch(() => setLoggedIn(false))
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    } else {
      history.push('/signup');
      localStorage.removeItem('jwt');
    }
  }, [loggedIn]);

  
  const handleSuccessLoginPopupClose = () => {
    checkToken().then(() => setLoggedIn(true));
    closeAllPopups();
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
      }).catch((err) => {console.log(`Error in getting initial user data ${err}`)})
  
      api.getCardsList().then((res) => {
        setCards(res.map(item => item))
      }).catch((err) => {console.log(`Error in getting initial card list ${err}`)})
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
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setSelectedCard(null);
    setIsRegisterSuccessPopupOpen(false);
    setIsLoginErrorPopupOpen(false);
  }

  function handleUpdateUser(name, about) {
    api.editProfileInfo(name, about).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    }).catch((err) => {console.log(`Error in update user data ${err}`)})
  }

  function handleUpdateAvatar(link) {
    api.editProfilePhoto(link).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    }).catch((err) => {console.log(`Error in avatar update ${err}`)})
  }

  function handleAddPlace(cardName, cardLink) {
    api.addNewCard(cardName, cardLink).then((newCardInfo) => {
      setCards([newCardInfo, ...cards]);
      closeAllPopups();
    }).catch((err) => {console.log(`Error in adding new card ${err}`)})
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
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
            email={userEmail}
          /> 
          <Switch>
            <Route path="/signup">
              <Register 
                setIsRegisterSuccessPopupOpen = {setIsRegisterSuccessPopupOpen}
                setIsLoginErrorPopupOpen={setIsLoginErrorPopupOpen}/>
            </Route>
            <Route path="/signin">
              <Login 
                setLoggedIn={setLoggedIn}
                setUserEmail={setUserEmail}
                setIsLoginErrorPopupOpen={setIsLoginErrorPopupOpen} 
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
                onClose = {closeAllPopups}
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
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <PopupAuthInfo
            isOpen={isRegisterSuccessPopupOpen}
            onClose={closeAllPopups}
            name='register-success'
            icon={iconRegisterSuccess}
            title="Вы успешно зарегистрировались!"
          />
          <PopupAuthInfo
            isOpen={isLoginErrorPopupOpen}
            onClose={handleSuccessLoginPopupClose}
            name='login-error'
            icon={iconLoginError}
            title="Что-то пошло не так! Попробуйте еще раз!"
          />
          { selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
          {loggedIn && <Footer/>}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
