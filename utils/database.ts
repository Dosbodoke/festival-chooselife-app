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
          created_at: string;
          height: number;
          id: string;
          lenght: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          height: number;
          id?: string;
          lenght: number;
          name: string;
        };
        Update: {
          created_at?: string;
          height?: number;
          id?: string;
          lenght?: number;
          name?: string;
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
