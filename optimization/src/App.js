import React, { useState, useCallback } from 'react'

import Button from './components/UI/Button/Button'
import DemoOutput from './components/Demo/DemoOutput'

import './App.css'

function App() {
  const [showParagraph, setShowParagraph] = useState(false)

  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph((prevState) => !prevState)
  }, [])

  console.log('App running')

  return (
    <div className='app'>
      <h1>Hi there!</h1>
      <Button onClick={toggleParagraphHandler}>Toggle paragraph</Button>
      <DemoOutput show={true} />
    </div>
  )
}

export default App
