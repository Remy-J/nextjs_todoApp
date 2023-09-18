import { render, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { useRouter } from 'next/navigation'
import DeleteButton from '@/app/components/DeleteButton'
import { UPDATE_TODO } from '@/app/queries/todoQueries'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockRouterPush = jest.fn()

describe('DeleteButton', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('DeleteButton should be rendered', () => {
    const { getByRole } = render(<DeleteButton id={1} additionalClass='custom-class' />)
    const button = getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('delete')
    expect(button).toHaveClass('custom-class')
  })

  it('should redirect', async () => {
    useRouter.mockReturnValue({ push: mockRouterPush })
    const mocks = [
      {
        request: {
          query: UPDATE_TODO,
          variables: { id: 1 },
        },
        result: {
          data: {},
        },
      },
    ]

    const { getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteButton id={1} redirect />
      </MockedProvider>,
    )

    const button = getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/')
    })
  })
})
