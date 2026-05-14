import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kobsndrjtvcxenhvhopy.supabase.co";
const supabaseKey = "sb_publishable_RzlOk0FQ82mJ2SXDPaKZbw_dxTxFBIb";

export const supabase = createClient(supabaseUrl, supabaseKey);
