import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider, useDispatch } from 'react-redux'
import { createStore } from 'redux'

import { login } from '../../core/actions'
import { rootReducer } from '../../core/reducer'
import { getIsSocialLoginEnabled } from '../../core/selectors'
import { config } from '../../config'
import { translate } from '../../translations/utils'
import { ApplicationConfig } from '../../types/config'

import { Login } from './Login'

jest.mock('../../translations/utils')
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))
jest.mock('../../core/selectors')

jest.mock('../../config', () => ({
  config: {
    getConfig: jest.fn(),
  },
}))

describe('<Login />', () => {
  const validEmail = 'mail@mail.com'
  const invalidEmail = 'mail@m'
  const validPhoneNumber = '+38099-999-9999'
  const invalidPhoneNumber = '+38099'

  const mockedDispatch = jest.fn()

  const renderWithStore = () => {
    const store = createStore(rootReducer)

    return render(
      <Provider store={store}>
        <Login />
      </Provider>
    )
  }

  beforeEach(() => {
    jest.mocked(translate).mockImplementation(t => t)
    jest.mocked(useDispatch).mockReturnValue(mockedDispatch)
    jest.mocked(config.getConfig).mockReturnValue({
      shouldShowPolicyOnLoginPage: false,
    } as ApplicationConfig)
  })
  afterEach(jest.clearAllMocks)

  it('should show sign in title', () => {
    renderWithStore()
    const signinTitle = screen.getByTestId('signin-title')

    expect(signinTitle).toHaveTextContent('sign-in')
  })

  it('should have disabled login button if email validation failed', () => {
    renderWithStore()

    const emailField = screen.getByTestId('email-field')
    const phoneField = screen.getByTestId('phone-field')
    userEvent.type(emailField, invalidEmail)
    userEvent.clear(phoneField)
    userEvent.type(phoneField, validPhoneNumber)

    const signinButton = screen.getByTestId('signin-btn')
    expect(signinButton).toBeDisabled()
  })

  it('should have disabled login button if password validation failed', () => {
    renderWithStore()

    const emailField = screen.getByTestId('email-field')
    const phoneField = screen.getByTestId('phone-field')
    userEvent.type(emailField, validEmail)
    userEvent.clear(phoneField)
    userEvent.type(phoneField, invalidPhoneNumber)

    const signinButton = screen.getByTestId('signin-btn')
    expect(signinButton).toBeDisabled()
  })

  it('should have enabled login button if email and password validation succeed', () => {
    renderWithStore()
    const emailField = screen.getByTestId('email-field')
    const phoneField = screen.getByTestId('phone-field')

    userEvent.type(emailField, validEmail)
    userEvent.clear(phoneField)
    userEvent.type(phoneField, validPhoneNumber)

    const signinButton = screen.getByTestId('signin-btn')
    expect(signinButton).toBeEnabled()
  })

  it('should call login after click on login btn', () => {
    renderWithStore()
    const emailField = screen.getByTestId('email-field')
    const phoneField = screen.getByTestId('phone-field')

    userEvent.type(emailField, validEmail)
    userEvent.clear(phoneField)
    userEvent.type(phoneField, validPhoneNumber)

    const signinButton = screen.getByTestId('signin-btn')
    userEvent.click(signinButton)

    expect(mockedDispatch).toBeCalledWith(login())
  })

  it('should show social login buttons if socialLogin feature is enabled', () => {
    jest.mocked(getIsSocialLoginEnabled).mockReturnValue(true)
    renderWithStore()

    const socialBtns = screen.getByTestId('social-btns')
    expect(socialBtns).toBeInTheDocument()
  })

  it('should not show social login buttons if socialLogin feature is disabled', () => {
    jest.mocked(getIsSocialLoginEnabled).mockReturnValue(false)
    renderWithStore()

    const socialBtns = screen.queryByTestId('social-btns')
    expect(socialBtns).not.toBeInTheDocument()
  })

  it('should show security policy if config variable is enabled', () => {
    jest.mocked(config.getConfig).mockReturnValue({
      shouldShowPolicyOnLoginPage: true,
    } as ApplicationConfig)
    renderWithStore()

    const socialBtns = screen.getByText('policy-text')
    expect(socialBtns).toBeInTheDocument()
  })

  it('should show security policy if config variable is disabled', () => {
    jest.mocked(config.getConfig).mockReturnValue({
      shouldShowPolicyOnLoginPage: false,
    } as ApplicationConfig)
    renderWithStore()

    const socialBtns = screen.queryByText('policy-text')
    expect(socialBtns).not.toBeInTheDocument()
  })
})
