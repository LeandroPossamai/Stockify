import { Metadata } from 'next'
import { RegisterForm } from '.'

export const metadata: Metadata = {
  title: 'Cadastro'
}

export default function Page() {
  return <RegisterForm />
}
