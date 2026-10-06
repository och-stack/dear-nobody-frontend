import { createContext, useContext, useState } from 'react'
import { ENDPOINTS } from '../App'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  // log the user out and remove the token
  function logout() {
    localStorage.removeItem('token')
    setToken(null)
  }


  // API requests
  async function apiFetch(url, options = {}) {
    // send the request to the API
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}), //Add the JWT token if the user is logged in
        ...options.headers, //keep additional headers provided by the caller
      },
    })

    // convert response into JSON
    const body = await res.json().catch(() => ({}))

    // log user out if token expired
    if (res.status === 401 && token) logout()

    if (!res.ok) {
      const err = body.error?.message || body.error || body.message
      throw new Error(err || `Request failed (${res.status})`)
    }

    return body.data ?? body
  }

  // log user in
  async function login(email, password) {
    // send the login details to the backend
    const data = await apiFetch(ENDPOINTS.login, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    // get the JWT token returned by the API
    const newToken =
      data.token ||
      data.access_token ||
      data.session?.access_token

    if (!newToken) {
      throw new Error('No token returned from /login')
    }

    // save the token so the user stays logged in
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  // create new account
  async function signup(email, password, username) {
    // send the signup details to the backend
    return apiFetch(ENDPOINTS.signup, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    })
  }

  // make authentication data and functions available to child components
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        signup,
        logout,
        apiFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}