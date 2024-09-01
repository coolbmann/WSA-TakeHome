import { supabase } from "../configs/supabaseClient";

const getPlayers = async (teamId: string) => {
  try {
    const { data, error } = await supabase.rpc("get_borrowable_players", {
      selected_team_id: teamId,
    });

    if (error) {
      throw new Error("Error at getPlayers: " + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getPlayers };
