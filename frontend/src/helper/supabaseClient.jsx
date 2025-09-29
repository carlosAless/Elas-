import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://jqbaughzgktiyktuoews.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxYmF1Z2h6Z2t0aXlrdHVvZXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NzAwNTgsImV4cCI6MjA3MjM0NjA1OH0.6EUZ5uYWk4iwjOhmCXDLPomku0ueMtZLtNX4HIoL8Vc";

export const supabase = createClient(supabaseURL, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
