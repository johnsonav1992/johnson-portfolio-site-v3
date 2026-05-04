import { inputGroupStyles, formFieldStyles, labelStyles } from '../styles.ts'

interface ContactFieldProps {
  defaultValue: string
  id: string
  label: string
  name: string
  placeholder: string
  type?: 'email' | 'text'
}

export const ContactField = () => {
  return ({ defaultValue, id, label, name, placeholder, type = 'text' }: ContactFieldProps) => (
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
        defaultValue={defaultValue}
        required
      />
    </div>
  )
}
