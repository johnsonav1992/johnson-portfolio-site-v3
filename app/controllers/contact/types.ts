import type { SerializableProps } from 'remix/ui'

export interface ContactData {
  name: string
  email: string
  message: string
  honeypot?: string
  loadedAt?: number
}

export type ContactEmailPayload = Pick<ContactData, 'name' | 'email' | 'message'>

export interface ContactFormValues extends SerializableProps {
  name: string
  email: string
  message: string
}

export interface ContactResult extends SerializableProps {
  type: 'success' | 'error'
  message: string
}
