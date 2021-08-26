import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {}
})

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn')
    if (storedUserLoggedInInfo === '1') {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', '1')
    } else {
      localStorage.setItem('isLoggedIn', '0')
    }
  }, [isLoggedIn])

  const loginHandler = () => {
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
