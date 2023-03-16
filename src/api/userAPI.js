import { API } from "../config.js"

export const userRegister = (username, email, password) => {
  const user = { username, email, password }
  return fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      return console.log(error)
    })
}

export const verifyEmail = (token) => {
  return fetch(`${API}/emailverification/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const login = (email, password) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}


export const authenticate = (data) => {
  localStorage.setItem("jwt", JSON.stringify(data))
}

export const isAuthenticated = () => {
  return localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false
}

export const signOut = () => {
  localStorage.removeItem("jwt")
  return fetch(`${API}/signout`)
    .then(res => res.json())
    .catch(err => console.log(err))

}

export const forgetPassword = (email) => {
  return fetch(`${API}/forgetpassword`,


    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })

    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const resetPassword = (token, password) => {
  return fetch(`${API}/resetpassword/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}