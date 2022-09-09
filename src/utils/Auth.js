const authUrl = 'http://mestofront.nomoredomains.sbs/api'

function checkResponse(res, job) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка в ${job}`)
}

export const register = (email, password) => {
  const job = 'register new user'
  return fetch(
    `${authUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password})
    }
  ).then((response) => {return checkResponse(response, job)})
}

export const login = (email, password) => {
  const job = 'login a user'
  return fetch(
    `${authUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
    }
  ).then((response) => {return checkResponse(response, job)})
}

export const checkToken = () => {
  const job = 'check JWT validity'
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    return fetch(
      `${authUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        }
      }
    ).then((response) => {return checkResponse(response, job)})
  } else {
    return Promise.reject();
  }
}
