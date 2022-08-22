import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { translate } from '../../translations/utils'
import { config } from '../../config'
import { getIsSocialLoginEnabled } from '../../core/selectors'

import { PhoneInput } from '../Input/PhoneInput'
import { EmailField } from '../Input/EmailField'
import { SocialLoginButtons } from '../SocialLoginButtons/SocialLoginButtons'
import { login } from '../../core/actions'

export const Login: FC = () => {
  const dispatch = useDispatch()

  const { shouldShowPolicyOnLoginPage } = config.getConfig()
  const [emailFieldError, setEmailFieldError] = useState(false)
  const [phoneFieldError, setPhoneFieldError] = useState(false)

  const isSocialLoginEnabled = useSelector(getIsSocialLoginEnabled)

  return (
    <div style={{ border: '1px solid', padding: '2rem', width: '20rem' }}>
      <h3 data-testid='signin-title'>{translate('sign-in')}</h3>
      <EmailField
        fieldError={emailFieldError}
        setFieldError={setEmailFieldError}
      />
      <PhoneInput
        fieldError={phoneFieldError}
        setFieldError={setPhoneFieldError}
      />
      <button
        disabled={emailFieldError || phoneFieldError}
        data-testid='signin-btn'
        onClick={() => dispatch(login())}
      >
        {translate('sign-in')}
      </button>
      {isSocialLoginEnabled && <SocialLoginButtons />}
      <br />
      {shouldShowPolicyOnLoginPage && (
        <span style={{ fontSize: '14px' }}>{translate('policy-text')}</span>
      )}
    </div>
  )
}
