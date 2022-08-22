import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { EmailField } from './EmailField'
import { isValidEmailAddress } from '../../core/validators'
import { translate } from '../../translations/utils'

jest.mock('../../core/validators')
jest.mock('../../translations/utils')

describe('<EmailField />', () => {
  const email = 'email@mail.com'
  const setFieldError = jest.fn()

  beforeEach(() => jest.mocked(translate).mockImplementation(t => t))
  afterEach(jest.clearAllMocks)

  it('should not show error if it not passed to component', () => {
    jest.mocked(isValidEmailAddress).mockReturnValue(true)

    render(<EmailField setFieldError={setFieldError} fieldError={false} />)
    const emailField = screen.getByTestId('email-field')

    userEvent.type(emailField, email)

    expect(
      screen.queryByText('incorrect-email-address')
    ).not.toBeInTheDocument()
  })

  it('should show error if it passed to component', () => {
    jest.mocked(isValidEmailAddress).mockReturnValue(false)

    render(<EmailField setFieldError={setFieldError} fieldError={true} />)
    const emailField = screen.getByTestId('email-field')

    userEvent.type(emailField, email)

    expect(screen.getByText('incorrect-email-address')).toBeInTheDocument()
  })

  it('should call setFieldError with true if validation failed', () => {
    jest.mocked(isValidEmailAddress).mockReturnValue(false)

    render(<EmailField setFieldError={setFieldError} fieldError={false} />)
    const emailField = screen.getByTestId('email-field')

    userEvent.type(emailField, email)

    expect(setFieldError).toBeCalledWith(true)
  })

  it('should call setFieldError with false if validation success', () => {
    jest.mocked(isValidEmailAddress).mockReturnValue(true)

    render(<EmailField setFieldError={setFieldError} fieldError={false} />)
    const emailField = screen.getByTestId('email-field')

    userEvent.type(emailField, email)

    expect(setFieldError).toBeCalledWith(false)
  })
})
