import { supabase } from "../configs/supabaseClient";

const getTeams = async () => {
  try {
    const { data, error } = await supabase.from("teams_info").select("*");

    if (error) {
      throw new Error("Error at getTeams: " + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getTeams };
