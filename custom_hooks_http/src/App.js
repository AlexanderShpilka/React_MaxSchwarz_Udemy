import React, { useEffect, useState, useCallback } from 'react'

import Tasks from './components/Tasks/Tasks'
import NewTask from './components/NewTask/NewTask'

import useHttp from './hooks/useHttp'

function App() {
  const [tasks, setTasks] = useState([])

  const transformTasks = useCallback((data) => {
    console.log(data)
    const loadedTasks = []

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text })
    }

    setTasks(loadedTasks)
  }, [])

  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    fetchTasks(
      {
        url: 'https://react-http-2ebff-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        method: 'get'
      },
      transformTasks
    )
  }, [])

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task))
  }

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
    </React.Fragment>
  )
}

export default App
