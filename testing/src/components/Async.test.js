import { render, screen } from '@testing-library/react'

import Async from './Async'

const generatePosts = (num) => {
  const posts = []
  for (let i = 0; i < num; i++) {
    const currentIdentifier = i + 1
    posts.push({ id: `id${currentIdentifier}`, title: `Title_${currentIdentifier}` })
  }
  return posts
}

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    // arrange
    window.fetch = jest.fn()
    window.fetch.mockResolvedValueOnce({
      json: async () => generatePosts(5)
    })
    render(<Async />)

    const listItemElements = await screen.findAllByRole('listitem')
    expect(listItemElements).not.toHaveLength(0)
  })
})
