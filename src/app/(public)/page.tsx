'use client'
import { useUser } from '@/hooks/use-user'
import { Button } from '@nextui-org/react'

export default function Home() {
  const { logout } = useUser()
  return (
    <div>
      hello world
      <Button onPress={logout}>Sair</Button>
    </div>
  )
}
