import React, { ChangeEvent, FC, useState } from 'react'

import { isValidEmailAddress } from '../../core/validators'
import { translate } from '../../translations/utils'

interface EmailFieldProps {
  fieldError: boolean
  setFieldError: (value: boolean) => void
}

export const EmailField: FC<EmailFieldProps> = ({
  fieldError,
  setFieldError,
}) => {
  const [value, setValue] = useState('')

  const validate = (value: string) => {
    const isValid = isValidEmailAddress(value)
    if (!isValid) {
      return setFieldError(true)
    }
    return setFieldError(false)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    validate(e.target.value)
    return setValue(e.target.value)
  }

  return (
    <div>
      <input
        type='email'
        id='email'
        name='email'
        value={value}
        onChange={onChangeHandler}
        placeholder='email@mail.com'
        data-testid='email-field'
      />
      <span>
        <br />
        {fieldError && (
          <span style={{ color: 'red', fontSize: '14px' }}>
            {translate('incorrect-email-address')}
          </span>
        )}
      </span>
    </div>
  )
}
