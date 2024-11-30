import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);