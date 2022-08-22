import React, { ChangeEvent, FC, useState } from 'react'

import { isValidPhoneNumber } from '../../core/validators'
import { translate } from '../../translations/utils'

interface PhoneFieldProps {
  fieldError: boolean
  setFieldError: (value: boolean) => void
}

export const PhoneInput: FC<PhoneFieldProps> = ({
  fieldError,
  setFieldError,
}) => {
  const [value, setValue] = useState('+380')

  const validate = (value: string) => {
    const isValid = isValidPhoneNumber(value)

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
        type='tel'
        id='phone'
        name='phone'
        value={value}
        onChange={onChangeHandler}
        data-testid='phone-field'
      />
      <span>
        <br />
        {fieldError && (
          <span style={{ color: 'red', fontSize: '14px' }}>
            {translate('incorrect-phone-number')}
          </span>
        )}
      </span>
    </div>
  )
}
