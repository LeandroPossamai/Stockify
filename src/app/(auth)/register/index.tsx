'use client'
import { Divider } from '@/components/divider'
import { useUser } from '@/hooks/use-user'
import { LoginRequest, SignUpRequest, loginSchema, signUpSchema } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, CardFooter, Input } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'

export function RegisterForm() {
  const { register, handleSubmit, formState } = useForm<SignUpRequest>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  })
  const { signInWithGoogle, singUp, isAuthenticated } = useUser()

  if (isAuthenticated) {
    return redirect('/')
  }

  async function onSubmit({ email, password }: SignUpRequest) {
    await singUp(email, password)
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
          <Input
            label="Confirmar senha"
            type="password"
            errorMessage={formState.errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </CardBody>
        <CardFooter className="flex-col">
          <Button type="submit" color="primary" className="w-full">
            Cadastrar
          </Button>
          <Divider text="Ou" />
          <Button type="button" variant="ghost" className="w-full" onPress={signInWithGoogle}>
            <FcGoogle className="h-8 w-8" />
            Continue com Google
          </Button>
          <div className="mt-4 text-sm font-medium">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-500 hover:underline">
              Entre
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
