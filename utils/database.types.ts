export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      highline: {
        Row: {
          backup_webbing: string;
          created_at: string;
          description: string | null;
          height: number;
          id: string;
          lenght: number;
          main_webbing: string;
          name: string;
          sector_id: number | null;
        };
        Insert: {
          backup_webbing?: string;
          created_at?: string;
          description?: string | null;
          height: number;
          id?: string;
          lenght: number;
          main_webbing?: string;
          name: string;
          sector_id?: number | null;
        };
        Update: {
          backup_webbing?: string;
          created_at?: string;
          description?: string | null;
          height?: number;
          id?: string;
          lenght?: number;
          main_webbing?: string;
          name?: string;
          sector_id?: number | null;
        };
      };
      role: {
        Row: {
          comment: string | null;
          created_at: string | null;
          crossing_time: number | null;
          distance_walked: number | null;
          highline_id: string;
          id: number;
          is_cadena: boolean | null;
          is_full_line: boolean | null;
          is_highliner: boolean;
          name: string;
          witness: string[] | null;
        };
        Insert: {
          comment?: string | null;
          created_at?: string | null;
          crossing_time?: number | null;
          distance_walked?: number | null;
          highline_id: string;
          id?: number;
          is_cadena?: boolean | null;
          is_full_line?: boolean | null;
          is_highliner: boolean;
          name: string;
          witness?: string[] | null;
        };
        Update: {
          comment?: string | null;
          created_at?: string | null;
          crossing_time?: number | null;
          distance_walked?: number | null;
          highline_id?: string;
          id?: number;
          is_cadena?: boolean | null;
          is_full_line?: boolean | null;
          is_highliner?: boolean;
          name?: string;
          witness?: string[] | null;
        };
      };
      sector: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_total_walked: {
        name: "string";
        total_distance_walked: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
