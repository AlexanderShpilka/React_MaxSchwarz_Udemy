import Section from '../UI/Section'
import TaskForm from './TaskForm'

import useHttp from '../../hooks/useHttp'

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTask } = useHttp()

  const createTask = (taskText, data) => {
    const generatedId = data.name // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText }

    props.onAddTask(createdTask)
  }

  const enterTaskHandler = async (taskText) => {
    sendTask(
      {
        url: 'https://react-http-2ebff-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { text: taskText }
      },
      createTask.bind(null, taskText)
    )
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  )
}

export default NewTask
