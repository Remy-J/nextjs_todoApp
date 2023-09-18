import { render, waitFor } from '@testing-library/react'
import TodoDetails from '@/app/[id]/page'

// Mock Apollo Client
jest.mock('../lib/apolloClient', () => ({
  client: {
    query: jest.fn().mockResolvedValue({
      data: {
        todo: {
          id: 1,
          title: 'Test Todo',
          completed: true,
          description: 'This is a test todo',
          imageURL: 'https://example.com/image.jpg',
        },
      },
    }),
  },
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('TodoDetails', () => {
  it('renders todo details when data is available', async () => {
    const { getByDisplayValue, getByTestId } = render(await (async () => await TodoDetails({ params: { id: 1 } }))())
    await waitFor(() => {
      expect(getByDisplayValue('Test Todo')).toBeInTheDocument()
      expect(getByTestId('completed').checked).toEqual(true)
      expect(getByDisplayValue('https://example.com/image.jpg')).toBeInTheDocument()
      expect(getByDisplayValue('This is a test todo')).toBeInTheDocument()
    })
  })
})
