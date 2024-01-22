// Command used to generate the types
// npx supabase gen types typescript --local --schema storage,public,functions > utils/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      entry: {
        Row: {
          cadenas: number | null;
          comment: string | null;
          created_at: string;
          crossing_time: number | null;
          distance_walked: number | null;
          full_lines: number | null;
          highline_id: string;
          id: string;
          instagram: string;
          is_highliner: boolean;
          witness: string[] | null;
        };
        Insert: {
          cadenas?: number | null;
          comment?: string | null;
          created_at?: string;
          crossing_time?: number | null;
          distance_walked?: number | null;
          full_lines?: number | null;
          highline_id: string;
          id?: string;
          instagram: string;
          is_highliner: boolean;
          witness?: string[] | null;
        };
        Update: {
          cadenas?: number | null;
          comment?: string | null;
          created_at?: string;
          crossing_time?: number | null;
          distance_walked?: number | null;
          full_lines?: number | null;
          highline_id?: string;
          id?: string;
          instagram?: string;
          is_highliner?: boolean;
          witness?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "entry_highline_id_fkey";
            columns: ["highline_id"];
            referencedRelation: "highline";
            referencedColumns: ["id"];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: "highline_sector_id_fkey";
            columns: ["sector_id"];
            referencedRelation: "sector";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          birthday: string | null;
          description: string | null;
          id: string;
          name: string | null;
          profile_picture: string | null;
          username: string | null;
        };
        Insert: {
          birthday?: string | null;
          description?: string | null;
          id: string;
          name?: string | null;
          profile_picture?: string | null;
          username?: string | null;
        };
        Update: {
          birthday?: string | null;
          description?: string | null;
          id?: string;
          name?: string | null;
          profile_picture?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
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
        Relationships: [];
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
      profile_stats: {
        Args: {
          username: string;
        };
        Returns: {
          total_distance_walked: number;
          total_cadenas: number;
          total_full_lines: number;
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
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

export type Tables = Database["public"]["Tables"];
