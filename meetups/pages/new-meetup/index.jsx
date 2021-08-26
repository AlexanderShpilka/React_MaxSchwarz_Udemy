import { useRouter } from 'next/router'

import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetupPage() {
  const router = useRouter()

  async function addMeetupHandler(meetupData) {
    await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    router.push('/')
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage
