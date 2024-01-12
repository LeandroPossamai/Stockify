import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Home | Stockify',
    template: '%s | Stockify'
  },
  icons: {
    icon: '/stockify_logo.png'
  },
  description:
    'Otimize a gestão de estoque da sua loja com nosso aplicativo intuitivo. Controle em tempo real, alertas de estoque baixo e afins. Acesse agora e impulsione o sucesso do seu negócio!'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-[100dvh]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
