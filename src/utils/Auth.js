const { apiConfig } = require("./constants");

const authUrl = apiConfig.url;

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

export const checkToken = (jwt) => {
  console.log(`Trying to check JWT: ${jwt}`)
  if (jwt) {
    return true;
  } else {
    return Promise.reject();
  }
}
