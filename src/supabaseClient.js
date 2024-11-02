import { createClient } from '@supabase/supabase-js';

// Substitua pelos valores específicos do seu projeto:
const supabaseUrl = 'https://xedmqngqukfopguebmtl.supabase.co/';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlZG1xbmdxdWtmb3BndWVibXRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3NDU0MTEsImV4cCI6MjA0MzMyMTQxMX0.PMUYLGgKqN7MiLQusJexnlydJ4Ywtobb_b2Q8lEKyjk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);