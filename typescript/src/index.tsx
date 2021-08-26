import { render } from 'react-dom'

import App from './App'

import TodosContextProvider from './store/todos-context'

import './index.css'

render(
  <TodosContextProvider>
    <App />
  </TodosContextProvider>,
  document.getElementById('root')
)
