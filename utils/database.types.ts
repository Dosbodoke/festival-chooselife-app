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
      entry: {
        Row: {
          comment: string | null;
          created_at: string;
          crossing_time: number | null;
          distance_walked: number | null;
          highline_id: string;
          id: string;
          instagram: string;
          is_cadena: boolean | null;
          is_full_line: boolean | null;
          is_highliner: boolean;
          witness: string[] | null;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          crossing_time?: number | null;
          distance_walked?: number | null;
          highline_id: string;
          id?: string;
          instagram: string;
          is_cadena?: boolean | null;
          is_full_line?: boolean | null;
          is_highliner: boolean;
          witness?: string[] | null;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          crossing_time?: number | null;
          distance_walked?: number | null;
          highline_id?: string;
          id?: string;
          instagram?: string;
          is_cadena?: boolean | null;
          is_full_line?: boolean | null;
          is_highliner?: boolean;
          witness?: string[] | null;
        };
      };
      highline: {
        Row: {
          backup_webbing: string;
          cover_image: string | null;
          created_at: string;
          description: string | null;
          height: number;
          id: string;
          lenght: number;
          main_webbing: string;
          name: string;
          riggers: string[] | null;
          sector_id: number | null;
        };
        Insert: {
          backup_webbing?: string;
          cover_image?: string | null;
          created_at?: string;
          description?: string | null;
          height: number;
          id?: string;
          lenght: number;
          main_webbing?: string;
          name: string;
          riggers?: string[] | null;
          sector_id?: number | null;
        };
        Update: {
          backup_webbing?: string;
          cover_image?: string | null;
          created_at?: string;
          description?: string | null;
          height?: number;
          id?: string;
          lenght?: number;
          main_webbing?: string;
          name?: string;
          riggers?: string[] | null;
          sector_id?: number | null;
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
      get_total_cadenas: {
        Args: {
          highline_id: string;
          page_number: number;
          page_size: number;
        };
        Returns: {
          instagram: string;
          total_cadenas: number;
        }[];
      };
      get_total_full_lines: {
        Args: {
          highline_id: string;
          page_number: number;
          page_size: number;
        };
        Returns: {
          instagram: string;
          total_full_lines: number;
        }[];
      };
      get_total_walked: {
        Args: {
          highline_id: string;
          page_number: number;
          page_size: number;
        };
        Returns: {
          instagram: string;
          total_distance_walked: number;
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
}
