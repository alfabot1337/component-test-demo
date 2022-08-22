import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { isValidPhoneNumber } from '../../core/validators'
import { translate } from '../../translations/utils'

import { PhoneInput } from './PhoneInput'

jest.mock('../../core/validators')
jest.mock('../../translations/utils')

describe('<PhoneInput />', () => {
  const phoneNumber = '+38099999999'
  const setFieldError = jest.fn()

  beforeEach(() => jest.mocked(translate).mockImplementation(t => t))
  afterEach(jest.clearAllMocks)

  it('should not show error if it not passed to component', () => {
    jest.mocked(isValidPhoneNumber).mockReturnValue(true)

    render(<PhoneInput setFieldError={setFieldError} fieldError={false} />)
    const phoneField = screen.getByTestId('phone-field')

    userEvent.type(phoneField, phoneNumber)

    expect(screen.queryByText('incorrect-phone-number')).not.toBeInTheDocument()
  })

  it('should show error if it passed to component', () => {
    jest.mocked(isValidPhoneNumber).mockReturnValue(false)

    render(<PhoneInput setFieldError={setFieldError} fieldError={true} />)
    const phoneField = screen.getByTestId('phone-field')

    userEvent.type(phoneField, phoneNumber)

    expect(screen.getByText('incorrect-phone-number')).toBeInTheDocument()
  })

  it('should call setFieldError with true if validation failed', () => {
    jest.mocked(isValidPhoneNumber).mockReturnValue(false)

    render(<PhoneInput setFieldError={setFieldError} fieldError={false} />)
    const phoneField = screen.getByTestId('phone-field')

    userEvent.type(phoneField, phoneNumber)

    expect(setFieldError).toBeCalledWith(true)
  })

  it('should call setFieldError with false if validation success', () => {
    jest.mocked(isValidPhoneNumber).mockReturnValue(true)

    render(<PhoneInput setFieldError={setFieldError} fieldError={false} />)
    const phoneField = screen.getByTestId('phone-field')

    userEvent.type(phoneField, phoneNumber)

    expect(setFieldError).toBeCalledWith(false)
  })
})
