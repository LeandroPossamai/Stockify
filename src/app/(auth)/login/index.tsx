'use client'
import { LoginRequest, loginSchema } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, CardFooter, Input } from '@nextui-org/react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

export function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  async function onSubmit({ email, password }: LoginRequest) {
    console.log({ email, password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Image src="/stockify.png" alt="logo" width={300} height={300} />
      <Card>
        <CardBody className="space-y-3">
          <Input label="Email" errorMessage={formState.errors.email?.message} {...register('email')} />
          <Input
            label="Senha"
            type="password"
            errorMessage={formState.errors.password?.message}
            {...register('password')}
          />
        </CardBody>
        <CardFooter>
          <Button type="submit" color="primary" className="w-full">
            Entrar
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
