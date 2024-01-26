import { env } from '@/env'
import admin from 'firebase-admin'

export const serviceAccount = {
  type: env.FIREBASE_ADMIN_TYPE,
  project_id: env.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: env.FIREBASE_ADMIN_PRIVATE_KEY,
  client_email: env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: env.FIREBASE_ADMIN_AUTH_PROVIDER_URL,
  client_x509_cert_url: env.FIREBASE_ADMIN_AUTH_CLIENT_URL,
  universe_domain: env.FIREBASE_ADMIN_UNIVERSE_DOMAIN
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, '\n')
}

export function initAdmin() {
  const privateKey = formatPrivateKey(serviceAccount.private_key)

  if (admin.apps.length > 0) {
    return admin.app()
  }

  const cert = admin.credential.cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey
  })

  return admin.initializeApp({ credential: cert, projectId: serviceAccount.project_id })
}

export default admin
