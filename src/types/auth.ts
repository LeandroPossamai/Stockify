import { ZodError, z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, 'Senha deve conter no mínimo 6 caracteres.')
    .max(64, 'Senha deve conter no máximo 64 caracteres.')
})

export type LoginRequest = z.infer<typeof loginSchema>

export const signUpSchema = loginSchema
  .extend({
    confirmPassword: z
      .string()
      .min(6, 'Senha deve conter no mínimo 6 caracteres.')
      .max(64, 'Senha deve conter no máximo 64 caracteres.')
  })
  .refine(data => {
    const { password, confirmPassword } = data

    if (password !== confirmPassword) {
      throw new ZodError([
        {
          path: ['confirmPassword'],
          message: 'The confirmation password does not match your password.',
          code: 'custom'
        }
      ])
    }

    return true
  })

export type SignUpRequest = z.infer<typeof signUpSchema>
