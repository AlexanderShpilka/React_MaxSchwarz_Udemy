import { useState, useEffect } from 'react'

import { useCounter } from './useCounter'

import Card from './Card'

const BackwardCounter = () => {
  // const [counter, setCounter] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((prevCounter) => prevCounter - 1)
  //   }, 1000)

  //   return () => clearInterval(interval)
  // }, [])
  const counter = useCounter('-')

  return <Card>{counter}</Card>
}

export default BackwardCounter
