export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      borrowing_rules: {
        Row: {
          can_borrow: number;
          competitions_allowed: string[] | null;
          divisions_allowed: string[] | null;
          id: string;
          rule_id: string | null;
        };
        Insert: {
          can_borrow: number;
          competitions_allowed?: string[] | null;
          divisions_allowed?: string[] | null;
          id: string;
          rule_id?: string | null;
        };
        Update: {
          can_borrow?: number;
          competitions_allowed?: string[] | null;
          divisions_allowed?: string[] | null;
          id?: string;
          rule_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "borrowing_rules_rule_id_fkey";
            columns: ["rule_id"];
            isOneToOne: false;
            referencedRelation: "rules";
            referencedColumns: ["id"];
          }
        ];
      };
      competition: {
        Row: {
          id: string;
          name: string;
          prize_money: number | null;
        };
        Insert: {
          id: string;
          name: string;
          prize_money?: number | null;
        };
        Update: {
          id?: string;
          name?: string;
          prize_money?: number | null;
        };
        Relationships: [];
      };
      division: {
        Row: {
          id: string;
          max_teams: number;
          name: string;
        };
        Insert: {
          id: string;
          max_teams: number;
          name: string;
        };
        Update: {
          id?: string;
          max_teams?: number;
          name?: string;
        };
        Relationships: [];
      };
      finals_eligibility: {
        Row: {
          borrowed_only: number;
          count_rounds: string[] | null;
          id: string;
          rule_id: string | null;
          started_only: number;
        };
        Insert: {
          borrowed_only: number;
          count_rounds?: string[] | null;
          id: string;
          rule_id?: string | null;
          started_only: number;
        };
        Update: {
          borrowed_only?: number;
          count_rounds?: string[] | null;
          id?: string;
          rule_id?: string | null;
          started_only?: number;
        };
        Relationships: [
          {
            foreignKeyName: "finals_eligibility_rule_id_fkey";
            columns: ["rule_id"];
            isOneToOne: false;
            referencedRelation: "rules";
            referencedColumns: ["id"];
          }
        ];
      };
      matches: {
        Row: {
          id: string;
          round: string;
        };
        Insert: {
          id: string;
          round: string;
        };
        Update: {
          id?: string;
          round?: string;
        };
        Relationships: [];
      };
      player_matches_link: {
        Row: {
          borrowed: number;
          match_id: string;
          player_id: string;
          started: number;
        };
        Insert: {
          borrowed: number;
          match_id: string;
          player_id: string;
          started: number;
        };
        Update: {
          borrowed?: number;
          match_id?: string;
          player_id?: string;
          started?: number;
        };
        Relationships: [
          {
            foreignKeyName: "player_matches_link_match_id_fkey";
            columns: ["match_id"];
            isOneToOne: false;
            referencedRelation: "matches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "player_matches_link_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "players";
            referencedColumns: ["id"];
          }
        ];
      };
      players: {
        Row: {
          full_name: string;
          id: string;
          team_id: string;
        };
        Insert: {
          full_name: string;
          id: string;
          team_id: string;
        };
        Update: {
          full_name?: string;
          id?: string;
          team_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "players_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams_info";
            referencedColumns: ["id"];
          }
        ];
      };
      rules: {
        Row: {
          applies_for_division_id: string[] | null;
          competition_id: string | null;
          enabled: number;
          id: string;
        };
        Insert: {
          applies_for_division_id?: string[] | null;
          competition_id?: string | null;
          enabled: number;
          id: string;
        };
        Update: {
          applies_for_division_id?: string[] | null;
          competition_id?: string | null;
          enabled?: number;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rules_competition_id_fkey";
            columns: ["competition_id"];
            isOneToOne: false;
            referencedRelation: "competition";
            referencedColumns: ["id"];
          }
        ];
      };
      team: {
        Row: {
          id: string;
          team_name: string;
        };
        Insert: {
          id: string;
          team_name: string;
        };
        Update: {
          id?: string;
          team_name?: string;
        };
        Relationships: [];
      };
      team_division_competition_link: {
        Row: {
          competition_id: string;
          division_id: string;
          team_id: string;
        };
        Insert: {
          competition_id: string;
          division_id: string;
          team_id: string;
        };
        Update: {
          competition_id?: string;
          division_id?: string;
          team_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "team_division_competition_link_competition_id_fkey";
            columns: ["competition_id"];
            isOneToOne: false;
            referencedRelation: "competition";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_division_competition_link_division_id_fkey";
            columns: ["division_id"];
            isOneToOne: false;
            referencedRelation: "division";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_division_competition_link_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_division_competition_link_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams_info";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      teams_info: {
        Row: {
          competition_name: string | null;
          division_name: string | null;
          id: string | null;
          team_name: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      get_applicable_players: {
        Args: {
          team_id: string;
        };
        Returns: {
          full_name: string;
          team_name: string;
          division_name: string;
          competition_name: string;
        }[];
      };
      get_borrowable_players: {
        Args: {
          selected_team_id: string;
        };
        Returns: {
          full_name: string;
          team_name: string;
          division_name: string;
          competition_name: string;
        }[];
      };
      get_these_players:
        | {
            Args: Record<PropertyKey, never>;
            Returns: {
              full_name: string;
              team_name: string;
              division_name: string;
              competition_name: string;
            }[];
          }
        | {
            Args: {
              selected_team_id: string;
            };
            Returns: {
              full_name: string;
              team_name: string;
              division_name: string;
              competition_name: string;
            }[];
          };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
