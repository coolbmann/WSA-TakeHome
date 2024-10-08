import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase";
import dotenv from "dotenv";

dotenv.config();

const supabaseURL = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient<Database>(supabaseURL, supabaseKey);

export { supabase };
