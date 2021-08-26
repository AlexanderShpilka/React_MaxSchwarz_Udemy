import { createContext, useState } from 'react'

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
})

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem('token'))
  })

  const userIsLoggedIn = !!token

  const loginHandler = (token) => {
    setToken(token)
    localStorage.setItem('token', JSON.stringify(token))
  }

  const logoutHandler = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext
