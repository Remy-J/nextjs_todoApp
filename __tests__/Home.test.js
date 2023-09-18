import { render, screen, waitFor } from '@testing-library/react'
import Home from '../app/page'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));


// Mock Apollo Client 
jest.mock('../lib/apolloClient', () => ({
  client: {
    query: jest.fn().mockResolvedValue({
      data: {
        todos: [
          {
            id: 1,
            title: 'Task 1',
            completed: false,
          },
          {
            id: 2,
            title: 'Task 2',
            completed: true,
          },
        ],
      },
    }),
  },
}))

test('should display page title', async () => {
  render(await (async () => await Home())())
  await waitFor(() => {
    const titleElement = screen.getByText('Todo list')
    expect(titleElement).toBeInTheDocument()
  })
})

test('should diplay task list', async () => {
  render(await (async () => await Home())())

  // Attendre que les tâches soient chargées et affichées
  await waitFor(() => {
    const task1Element = screen.getByText('Task 1')
    const task2Element = screen.getByText('Task 2')
    expect(task1Element).toBeInTheDocument()
    expect(task2Element).toBeInTheDocument()
  })
})
