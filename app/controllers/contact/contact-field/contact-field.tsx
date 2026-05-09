import type { Handle } from 'remix/ui'

import { formFieldStyles, inputGroupStyles, labelStyles } from '../styles.ts'

interface ContactFieldProps {
  defaultValue: string
  id: string
  label: string
  name: string
  placeholder: string
  type?: 'email' | 'text'
}

export const ContactField = (handle: Handle<ContactFieldProps>) => {
  return () => {
    const { defaultValue, id, label, name, placeholder, type = 'text' } = handle.props

    return (
      <div mix={inputGroupStyles}>
        <label
          htmlFor={id}
          mix={labelStyles}
        >
          {label}
        </label>
        <input
          id={id}
          mix={formFieldStyles}
          type={type}
          list={undefined}
          name={name}
          placeholder={placeholder}
          value={defaultValue}
          required
        />
      </div>
    )
  }
}
