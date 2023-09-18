import { render, fireEvent, waitFor } from '@testing-library/react'
import Modal from '@/app/components/Modal'

describe('Modal', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the edit button with the default label', () => {
    const { getByText } = render(<Modal />)
    const editButton = getByText('edit')

    expect(editButton).toBeInTheDocument()
  })

  it('should render the edit button with the custom label', () => {
    const { getByText } = render(<Modal label='Modifier' />)
    const editButton = getByText('Modifier')

    expect(editButton).toBeInTheDocument()
  })

  it('should display the form', () => {
    const { getByText, getByRole } = render(<Modal />)
    const editButton = getByText('edit')
    expect(editButton).toBeInTheDocument()
    fireEvent.click(editButton)
    const submitButton = getByRole('button', { name: 'Submit' })
    expect(submitButton).toBeInTheDocument()
  })

  it('should submit the creation form', async () => {
    const mutateMock = jest.fn()
    jest.mock('../lib/apolloClient.js', () => ({
      client: {
        mutate: () => mutateMock,
      },
    }))

    const { getByRole, getByText } = render(<Modal />)
    const editButton = getByText('edit')
    expect(editButton).toBeInTheDocument()
    fireEvent.click(editButton)

    const submitButton = getByRole('button', { name: 'Submit' })
    expect(submitButton).toBeInTheDocument()
    fireEvent.click(submitButton)
    setTimeout(async () => {
      await waitFor(() => expect(mutateMock).toHaveBeenCalled())
    }, 50)
  })
})
