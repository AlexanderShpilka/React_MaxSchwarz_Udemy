import { useRouter } from 'next/router'

function NewsDetailsPage() {
  const router = useRouter()

  console.log(router.query.newsId)

  return (
    <section>
      <h1>Some news</h1>
      <p>News Details</p>
    </section>
  )
}

export default NewsDetailsPage
