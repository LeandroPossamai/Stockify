'use client'
import { Divider } from '@/components/divider'
import { useTheme } from '@/hooks/use-theme'
import { useUser } from '@/hooks/use-user'
import { LoginRequest, loginSchema } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, CardFooter, Input } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'

export function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })
  const { signInWithGoogle, singIn, isAuthenticated } = useUser()
  const { selected } = useTheme()

  if (isAuthenticated) {
    return redirect('/')
  }

  async function onSubmit({ email, password }: LoginRequest) {
    await singIn(email, password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Image src={selected === 'light' ? '/stockify.png' : '/stockify_white.png'} alt="logo" width={300} height={300} />
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
        <CardFooter className="flex-col">
          <Button type="submit" color="primary" className="w-full">
            Entrar
          </Button>
          <Divider text="Ou" />
          <Button type="button" variant="ghost" className="w-full" onPress={signInWithGoogle}>
            <FcGoogle className="h-8 w-8" />
            Continue com Google
          </Button>
          <div className="mt-4 text-sm font-medium">
            Não tem uma conta?{' '}
            <Link href="/register" className="text-indigo-600 hover:text-indigo-500 hover:underline">
              Cadastre-se
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
