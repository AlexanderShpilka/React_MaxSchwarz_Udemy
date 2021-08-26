import React from 'react'
import { Transition } from 'react-transition-group'

import './Backdrop.css'

const animationTiming = {
  enter: 400,
  exit: 400
}

const Backdrop = (props) => {
  return (
    <Transition in={props.show} timeout={animationTiming} mountOnEnter unmountOnExit>
      {(state) => {
        const cssClasses = [
          'Backdrop',
          state === 'entering' ? 'BackdropOpen' : state === 'exiting' ? 'BackdropClosed' : ''
        ]

        return <div className={cssClasses.join(' ')} onClick={props.closed} />
      }}
    </Transition>
  )
}

export default Backdrop
