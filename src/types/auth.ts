import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, 'Senha deve conter no mínimo 6 caracteres.')
    .max(64, 'Senha deve conter no máximo 64 caracteres.')
})

export type LoginRequest = z.infer<typeof loginSchema>
