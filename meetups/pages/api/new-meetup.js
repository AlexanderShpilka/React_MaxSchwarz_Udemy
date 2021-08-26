import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return
  }

  const data = req.body
  const { title, image, address, description } = data

  const client = await MongoClient.connect(
    'mongodb+srv://shpinat479:Freedom13$Autumn2017@cluster0.6imtj.mongodb.net/meetups?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupsCollection = db.collection('meetups')

  await meetupsCollection.insertOne({ title, image, address, description })

  client.close()
  res.status(201).json({ message: 'Meetup inserted' })
}

export default handler
