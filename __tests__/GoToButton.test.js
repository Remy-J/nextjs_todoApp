import GoToButton from '@/app/components/GoToButton'
import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('GoToButton', () => {
  it('GoToButton should be rendered', () => {
    render(<GoToButton path='/example' label='Exemple' />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Exemple')
  })

  it('should call router.push with the correct path when clicked', () => {
    const pushMock = jest.fn()
    useRouter.mockReturnValue({ push: pushMock })

    render(<GoToButton path='/example' label='Exemple' />)
    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(pushMock).toHaveBeenCalledWith('/example')
  })

  it('should apply the additional CSS class correctly', () => {
    render(<GoToButton path='/example' label='Exemple' additionalClass='custom-class' />)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('custom-class')
  })
})
