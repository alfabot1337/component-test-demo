import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useDispatch } from 'react-redux'

import { facebookSocialLogin, googleSocialLogin } from '../../core/actions'

import { SocialLoginButtons } from './SocialLoginButtons'

jest.mock('react-redux')
describe('<SocialLoginButtons />', () => {
  const mockedDispatch = jest.fn()

  beforeEach(() => jest.mocked(useDispatch).mockReturnValue(mockedDispatch))

  it('should call google social login when clicked on google button', () => {
    render(<SocialLoginButtons />)
    userEvent.click(screen.getByTestId('social-google'))

    expect(mockedDispatch).toHaveBeenCalledWith(googleSocialLogin())
  })

  it('should call facebook social login when clicked on facebook button', () => {
    render(<SocialLoginButtons />)
    userEvent.click(screen.getByTestId('social-facebook'))

    expect(mockedDispatch).toHaveBeenCalledWith(facebookSocialLogin())
  })
})
