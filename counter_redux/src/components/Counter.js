import { useSelector, useDispatch } from 'react-redux'

import { counterActions } from '../store/counter'

import classes from './Counter.module.css'

const Counter = () => {
  const { counter, showCounter } = useSelector((state) => state.counter)

  const dispatch = useDispatch()

  const toggleCounterHandler = () => dispatch(counterActions.toggle())

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={() => dispatch(counterActions.increment())}>Increment</button>
        <button onClick={() => dispatch(counterActions.increase(5))}>Increase by 5</button>
        <button onClick={() => dispatch(counterActions.decrement())}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  )
}

export default Counter
