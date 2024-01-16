import { z } from 'zod'

const server = z.object({})

type ServerEnvs = z.infer<typeof server>

const client = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER: z.string(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string(),
  NEXT_PUBLIC_AWS_ACCESS_KEY_ID: z.string(),
  NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: z.string(),
  NEXT_PUBLIC_AWS_BUCKET: z.string(),
  NEXT_PUBLIC_API_BASE_URL: z.string()
})

type ClientEnvs = z.infer<typeof client>

const processEnv = {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_AWS_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  NEXT_PUBLIC_AWS_BUCKET: process.env.NEXT_PUBLIC_AWS_BUCKET,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
}

const merged = server.merge(client)
/** @type z.infer<merged>
 *  @ts-ignore - can't type this properly in jsdoc */
// eslint-disable-next-line no-unused-vars
let env: ServerEnvs & ClientEnvs = process.env

if (!!process.env.SKIP_ENV_VALIDATION === false) {
  const isServer = typeof window === 'undefined'

  const parsed = isServer
    ? merged.safeParse(processEnv) // on server we can validate all env vars
    : client.safeParse(processEnv) // on client we can only validate the ones that are exposed

  if (parsed.success === false) {
    console.error(':x: Invalid environment variables:', parsed.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables')
  }

  /** @type z.infer<merged>
   *  @ts-ignore - can't type this properly in jsdoc */
  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
        throw new Error(
          process.env.NODE_ENV === 'production'
            ? ':x: Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        )
      /*  @ts-ignore - can't type this properly in jsdoc */
      return target[prop]
    }
  })
}

export { env }
