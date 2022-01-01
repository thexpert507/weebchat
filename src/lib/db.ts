import { createClient } from '@supabase/supabase-js';
import { env } from './env';

const supabaseUrl = 'https://fgdpbefwkynxnewwdjie.supabase.co';

export const supabase = createClient(supabaseUrl, env.apiKey);
