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

function App() {

  // register / login states and functions

  const [loggedIn, setLoggedIn] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    } else {
      history.push('/signin');
      localStorage.removeItem('jwt');
    }
  })

  // main functionality states and functions
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getProfileInfo().then((res) => {
      setCurrentUser(res);
    }).catch((err) => {console.log(`Error in getting initial user data ${err}`)})

    api.getCardsList().then((res) => {
      setCards(res.map(item => item))
    }).catch((err) => {console.log(`Error in getting initial card list ${err}`)})
  }, []);
  
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
          <Header logo={logo} /> 
          <Switch>
            <Route path="/signup">
              <Register/>
            </Route>
            <Route path="/signin">
              <Login setLoggedIn={setLoggedIn}/>
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
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
          <AddPlacePopup isOpen={isAddCardPopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
          { selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
          <Footer/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
