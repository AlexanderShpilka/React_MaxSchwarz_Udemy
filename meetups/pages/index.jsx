import { MongoClient } from 'mongodb'
import Head from 'next/head'

import MeetupList from '../components/meetups/MeetupList'

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  )
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://shpinat479:Freedom13$Autumn2017@cluster0.6imtj.mongodb.net/meetups?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address
      })),
      revalidate: 3600 // every 3600 seconds (1 hour)
    }
  }
}

// export async function getServerSideProps() {
//   return {
//     props: {
//       meetups: [
//         {
//           id: 'm1',
//           title: 'The First Meetup',
//           image:
//             'https://london.ac.uk/sites/default/files/styles/max_1300x1300/public/2018-10/london-aerial-cityscape-river-thames_1.jpg?itok=6LenFxuz',
//           address: 'Some address 5, 12345 Some City',
//           description: 'This is the first meetup'
//         },
//         {
//           id: 'm2',
//           title: 'The Second Meetup',
//           image:
//             'https://d4r15a7jvr7vs.cloudfront.net/ewoJICAgICAgICAgICAgICAgICJidWNrZXQiOiAiZmlsZXMubGJyLmNsb3VkIiwKCSAgICAgICAgICAgICAgICAia2V5IjogInB1YmxpYy8yMDIxLTA3L3NodXR0ZXJzdG9ja18xNDUwMjU0OTU5LmpwZyIsCgkgICAgICAgICAgICAgICAgImVkaXRzIjogewoJICAgICAgICAgICAgICAgICAgInJlc2l6ZSI6IHsKCSAgICAgICAgICAgICAgICAgICAgIndpZHRoIjogOTQ1LAoJICAgICAgICAgICAgICAgICAgICAiaGVpZ2h0IjogNTI2LAoJICAgICAgICAgICAgICAgICAgICAiZml0IjogImNvdmVyIgoJICAgICAgICAgICAgICAgICAgfQoJICAgICAgICAgICAgICAgIH0KCSAgICAgICAgICAgIH0=',
//           address: 'Some address 5, 12345 Some City',
//           description: 'This is the second meetup'
//         }
//       ]
//     }
//   }
// }

export default HomePage
