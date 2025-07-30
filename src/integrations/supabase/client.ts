import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://saisntrtymyekbjvfdff.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhaXNudHJ0eW15ZWtianZmZGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MzMxMDAsImV4cCI6MjA2OTQwOTEwMH0.WjaR09sQqGtWLasFegkaC2hTVX1KYfRJlQun5voTBh8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});