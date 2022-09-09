import { apiConfig } from "./constants";

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res, job) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка в ${job}`)
  }

  getCardsList() {
    const job = 'Get card list'
    return fetch(`${this._url}/cards`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }

  getProfileInfo() {
    const job = 'Get user info'
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }

  editProfileInfo(newName, newAbout){
    const job = 'Edit user info'
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    }).then((res) => {return this._checkResponse(res, job)})
  }

  editProfilePhoto(photoUrl) {
    const job = 'Edit user photo'
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: photoUrl
      })
    }).then((res) => {return this._checkResponse(res, job)})
  }

  addNewCard(cardName, cardLink) {
    const job = 'Edit adding new card'
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      })
    }).then((res) => {return this._checkResponse(res, job)})
  }

  deleteCard(id) {
    const job = 'Deleting card'
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }

  addCardLike(id) {
    const job = 'Adding like to card'
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }

  deleteCardLike(id) {
    const job = 'Deleting like to card'
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteCardLike(id);
    }
    else {
      return this.addCardLike(id);
    };
  }
}

const api = new Api(apiConfig);

export default api;