import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { facebookSocialLogin, googleSocialLogin } from '../../core/actions'

export const SocialLoginButtons: FC = () => {
  const dispatch = useDispatch()

  return (
    <div
      style={{ border: '1px solid', marginTop: '2rem', padding: '1rem' }}
      data-testid='social-btns'
    >
      <span>Social login</span>
      <br />
      <button
        onClick={() => dispatch(googleSocialLogin())}
        data-testid='social-google'
      >
        Google
      </button>
      <button
        onClick={() => dispatch(facebookSocialLogin())}
        data-testid='social-facebook'
      >
        Facebook
      </button>
    </div>
  )
}
