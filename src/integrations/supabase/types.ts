export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      coaching_questions: {
        Row: {
          coaching_institute: string
          created_at: string
          embedding: string | null
          gs_paper: string | null
          id: string
          metadata: string | null
          page_number: number | null
          pdf_url: string
          question_text: string
          subject: string | null
          test_series: string | null
          topic: string | null
          topper_copy_id: string
          year: number | null
        }
        Insert: {
          coaching_institute: string
          created_at?: string
          embedding?: string | null
          gs_paper?: string | null
          id?: string
          metadata?: string | null
          page_number?: number | null
          pdf_url: string
          question_text: string
          subject?: string | null
          test_series?: string | null
          topic?: string | null
          topper_copy_id: string
          year?: number | null
        }
        Update: {
          coaching_institute?: string
          created_at?: string
          embedding?: string | null
          gs_paper?: string | null
          id?: string
          metadata?: string | null
          page_number?: number | null
          pdf_url?: string
          question_text?: string
          subject?: string | null
          test_series?: string | null
          topic?: string | null
          topper_copy_id?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "coaching_questions_topper_copy_id_fkey"
            columns: ["topper_copy_id"]
            isOneToOne: false
            referencedRelation: "topper_copies"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          contact_number: string | null
          created_at: string
          email: string | null
          id: string
          message: string
          name: string
          status: string
        }
        Insert: {
          contact_number?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message: string
          name: string
          status?: string
        }
        Update: {
          contact_number?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string
          name?: string
          status?: string
        }
        Relationships: []
      }
      pyq_coaching_matches: {
        Row: {
          coaching_question_id: string
          created_at: string
          id: string
          match_type: string
          similarity_score: number
          upsc_question_id: string
        }
        Insert: {
          coaching_question_id: string
          created_at?: string
          id?: string
          match_type?: string
          similarity_score: number
          upsc_question_id: string
        }
        Update: {
          coaching_question_id?: string
          created_at?: string
          id?: string
          match_type?: string
          similarity_score?: number
          upsc_question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pyq_coaching_matches_coaching_question_id_fkey"
            columns: ["coaching_question_id"]
            isOneToOne: false
            referencedRelation: "coaching_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pyq_coaching_matches_upsc_question_id_fkey"
            columns: ["upsc_question_id"]
            isOneToOne: false
            referencedRelation: "upsc_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      topper_copies: {
        Row: {
          appearances: Json
          coaching_institute: string
          created_at: string
          essay_score: number | null
          gs1_score: number | null
          gs2_score: number | null
          gs3_score: number | null
          gs4_score: number | null
          id: string
          pdf_url: string
          rank: number | null
          rank_source_url: string | null
          source_url: string | null
          test_series: string | null
          topper_name: string
          upsc_year: number | null
          year_source_url: string | null
        }
        Insert: {
          appearances?: Json
          coaching_institute: string
          created_at?: string
          essay_score?: number | null
          gs1_score?: number | null
          gs2_score?: number | null
          gs3_score?: number | null
          gs4_score?: number | null
          id?: string
          pdf_url: string
          rank?: number | null
          rank_source_url?: string | null
          source_url?: string | null
          test_series?: string | null
          topper_name: string
          upsc_year?: number | null
          year_source_url?: string | null
        }
        Update: {
          appearances?: Json
          coaching_institute?: string
          created_at?: string
          essay_score?: number | null
          gs1_score?: number | null
          gs2_score?: number | null
          gs3_score?: number | null
          gs4_score?: number | null
          id?: string
          pdf_url?: string
          rank?: number | null
          rank_source_url?: string | null
          source_url?: string | null
          test_series?: string | null
          topper_name?: string
          upsc_year?: number | null
          year_source_url?: string | null
        }
        Relationships: []
      }
      upsc_questions: {
        Row: {
          created_at: string
          embedding: string | null
          id: string
          marks: number | null
          paper_slug: string
          question_number: number
          question_text: string
          subject_slug: string
          words: number | null
          year: number
        }
        Insert: {
          created_at?: string
          embedding?: string | null
          id: string
          marks?: number | null
          paper_slug: string
          question_number: number
          question_text: string
          subject_slug: string
          words?: number | null
          year: number
        }
        Update: {
          created_at?: string
          embedding?: string | null
          id?: string
          marks?: number | null
          paper_slug?: string
          question_number?: number
          question_text?: string
          subject_slug?: string
          words?: number | null
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
