import { supabase } from "../configs/supabaseClient";

const getRules = async () => {
  try {
    const { data, error } = await supabase.from("all_rules").select("*");

    if (error) {
      throw new Error("Error at getRules: " + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getRules };
