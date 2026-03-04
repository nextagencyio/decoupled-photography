import { isDemoMode } from './demo-mode'

export interface ConfigStatus {
  isConfigured: boolean
  missingVars: string[]
  allVars: string[]
  isDemoMode: boolean
}

export function checkConfiguration(): ConfigStatus {
  if (isDemoMode()) {
    return { isConfigured: true, missingVars: [], allVars: [], isDemoMode: true }
  }
  const requiredVars = ['NEXT_PUBLIC_DRUPAL_BASE_URL', 'DRUPAL_CLIENT_ID', 'DRUPAL_CLIENT_SECRET', 'DRUPAL_REVALIDATE_SECRET']
  const missingVars = requiredVars.filter(v => { const val = process.env[v]; return !val || val.includes('your-') })
  return { isConfigured: missingVars.length === 0, missingVars, allVars: requiredVars, isDemoMode: false }
}
