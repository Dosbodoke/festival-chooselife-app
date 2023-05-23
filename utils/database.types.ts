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
        };
      };
      role: {
        Row: {
          comment: string | null;
          created_at: string | null;
          crossing_time: number;
          highline_id: string;
          id: number;
          is_cadena: boolean;
          name: string;
          witness: string[];
        };
        Insert: {
          comment?: string | null;
          created_at?: string | null;
          crossing_time: number;
          highline_id: string;
          id?: number;
          is_cadena: boolean;
          name: string;
          witness: string[];
        };
        Update: {
          comment?: string | null;
          created_at?: string | null;
          crossing_time?: number;
          highline_id?: string;
          id?: number;
          is_cadena?: boolean;
          name?: string;
          witness?: string[];
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
