import { Metadata } from 'next'
import { LoginForm } from '.'

export const metadata: Metadata = {
  title: 'Login'
}

export default function Page() {
  return <LoginForm />
}
