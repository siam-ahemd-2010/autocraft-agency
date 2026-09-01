import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Admin Client (Only for Server-side API routes & Server Actions)
export const adminSupabase = createClient(
  supabaseUrl,
  supabaseServiceKey
)