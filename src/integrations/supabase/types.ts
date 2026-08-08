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
      evaluation_quotas: {
        Row: {
          created_at: string
          daily_limit: number
          plan: string
          reset_at: string
          updated_at: string
          used_today: number
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_limit?: number
          plan?: string
          reset_at?: string
          updated_at?: string
          used_today?: number
          user_id: string
        }
        Update: {
          created_at?: string
          daily_limit?: number
          plan?: string
          reset_at?: string
          updated_at?: string
          used_today?: number
          user_id?: string
        }
        Relationships: []
      }
      evaluations: {
        Row: {
          created_at: string
          detected_meta: Json | null
          detected_question: string | null
          detected_question_id: string | null
          error_message: string | null
          evaluation: Json | null
          file_paths: Json
          id: string
          marks_awarded: number | null
          marks_out_of: number | null
          ocr_text: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          detected_meta?: Json | null
          detected_question?: string | null
          detected_question_id?: string | null
          error_message?: string | null
          evaluation?: Json | null
          file_paths?: Json
          id?: string
          marks_awarded?: number | null
          marks_out_of?: number | null
          ocr_text?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          detected_meta?: Json | null
          detected_question?: string | null
          detected_question_id?: string | null
          error_message?: string | null
          evaluation?: Json | null
          file_paths?: Json
          id?: string
          marks_awarded?: number | null
          marks_out_of?: number | null
          ocr_text?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      model_answers: {
        Row: {
          answer_md: string
          created_at: string
          id: string
          keywords: string[] | null
          paper_slug: string
          question_number: number | null
          question_text: string
          source: string
          subject_slug: string | null
          updated_at: string
          year: number | null
        }
        Insert: {
          answer_md: string
          created_at?: string
          id: string
          keywords?: string[] | null
          paper_slug: string
          question_number?: number | null
          question_text: string
          source?: string
          subject_slug?: string | null
          updated_at?: string
          year?: number | null
        }
        Update: {
          answer_md?: string
          created_at?: string
          id?: string
          keywords?: string[] | null
          paper_slug?: string
          question_number?: number | null
          question_text?: string
          source?: string
          subject_slug?: string | null
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      prelims_attempts: {
        Row: {
          accuracy: number | null
          correct_count: number | null
          created_at: string
          duration_seconds: number | null
          id: string
          incorrect_count: number | null
          max_score: number | null
          mode: string
          score: number | null
          started_at: string
          subject: string | null
          submitted_at: string | null
          total_scored: number | null
          unattempted_count: number | null
          updated_at: string
          user_id: string
          year: number | null
        }
        Insert: {
          accuracy?: number | null
          correct_count?: number | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          incorrect_count?: number | null
          max_score?: number | null
          mode: string
          score?: number | null
          started_at?: string
          subject?: string | null
          submitted_at?: string | null
          total_scored?: number | null
          unattempted_count?: number | null
          updated_at?: string
          user_id: string
          year?: number | null
        }
        Update: {
          accuracy?: number | null
          correct_count?: number | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          incorrect_count?: number | null
          max_score?: number | null
          mode?: string
          score?: number | null
          started_at?: string
          subject?: string | null
          submitted_at?: string | null
          total_scored?: number | null
          unattempted_count?: number | null
          updated_at?: string
          user_id?: string
          year?: number | null
        }
        Relationships: []
      }
      prelims_questions: {
        Row: {
          comments: string | null
          correct_option: string | null
          created_at: string
          id: string
          is_dropped: boolean
          needs_review: boolean
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question_text: string
          serial_no: number
          subject: string
          updated_at: string
          year: number
        }
        Insert: {
          comments?: string | null
          correct_option?: string | null
          created_at?: string
          id?: string
          is_dropped?: boolean
          needs_review?: boolean
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question_text: string
          serial_no: number
          subject: string
          updated_at?: string
          year: number
        }
        Update: {
          comments?: string | null
          correct_option?: string | null
          created_at?: string
          id?: string
          is_dropped?: boolean
          needs_review?: boolean
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question_text?: string
          serial_no?: number
          subject?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      prelims_responses: {
        Row: {
          attempt_id: string
          created_at: string
          flagged: boolean
          id: string
          is_correct: boolean | null
          question_id: string
          selected_option: string | null
          user_id: string
        }
        Insert: {
          attempt_id: string
          created_at?: string
          flagged?: boolean
          id?: string
          is_correct?: boolean | null
          question_id: string
          selected_option?: string | null
          user_id: string
        }
        Update: {
          attempt_id?: string
          created_at?: string
          flagged?: boolean
          id?: string
          is_correct?: boolean | null
          question_id?: string
          selected_option?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prelims_responses_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "prelims_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prelims_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "prelims_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string
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
      sociology_pyq_topper_matches: {
        Row: {
          created_at: string
          id: string
          is_verified: boolean
          match_type: string
          matching_reason: string | null
          pyq_id: string
          similarity_score: number
          topper_question_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_verified?: boolean
          match_type?: string
          matching_reason?: string | null
          pyq_id: string
          similarity_score?: number
          topper_question_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_verified?: boolean
          match_type?: string
          matching_reason?: string | null
          pyq_id?: string
          similarity_score?: number
          topper_question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sociology_pyq_topper_matches_pyq_id_fkey"
            columns: ["pyq_id"]
            isOneToOne: false
            referencedRelation: "sociology_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sociology_pyq_topper_matches_topper_question_id_fkey"
            columns: ["topper_question_id"]
            isOneToOne: false
            referencedRelation: "sociology_topper_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      sociology_questions: {
        Row: {
          chapter: string
          chapter_order: number
          chapter_slug: string
          created_at: string
          embedding: string | null
          id: string
          marks: number | null
          paper: number
          question_number: string | null
          question_text: string
          topic: string
          topic_order: number
          topic_slug: string
          updated_at: string
          year: number | null
        }
        Insert: {
          chapter: string
          chapter_order?: number
          chapter_slug: string
          created_at?: string
          embedding?: string | null
          id: string
          marks?: number | null
          paper: number
          question_number?: string | null
          question_text: string
          topic: string
          topic_order?: number
          topic_slug: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          chapter?: string
          chapter_order?: number
          chapter_slug?: string
          created_at?: string
          embedding?: string | null
          id?: string
          marks?: number | null
          paper?: number
          question_number?: string | null
          question_text?: string
          topic?: string
          topic_order?: number
          topic_slug?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      sociology_topper_copies: {
        Row: {
          copy_name: string | null
          copy_type: string | null
          created_at: string
          file_url: string | null
          id: string
          is_approved: boolean
          page_count: number | null
          paper: string | null
          pdf_url: string
          rank: number | null
          source_site: string
          source_url: string | null
          subject: string
          topper_name: string
          updated_at: string
          upsc_year: number | null
        }
        Insert: {
          copy_name?: string | null
          copy_type?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          is_approved?: boolean
          page_count?: number | null
          paper?: string | null
          pdf_url: string
          rank?: number | null
          source_site: string
          source_url?: string | null
          subject?: string
          topper_name: string
          updated_at?: string
          upsc_year?: number | null
        }
        Update: {
          copy_name?: string | null
          copy_type?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          is_approved?: boolean
          page_count?: number | null
          paper?: string | null
          pdf_url?: string
          rank?: number | null
          source_site?: string
          source_url?: string | null
          subject?: string
          topper_name?: string
          updated_at?: string
          upsc_year?: number | null
        }
        Relationships: []
      }
      sociology_topper_matches: {
        Row: {
          created_at: string
          id: string
          page_number: number | null
          similarity: number
          sociology_question_id: string
          topper_copy_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          page_number?: number | null
          similarity?: number
          sociology_question_id: string
          topper_copy_id: string
        }
        Update: {
          created_at?: string
          id?: string
          page_number?: number | null
          similarity?: number
          sociology_question_id?: string
          topper_copy_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sociology_topper_matches_sociology_question_id_fkey"
            columns: ["sociology_question_id"]
            isOneToOne: false
            referencedRelation: "sociology_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sociology_topper_matches_topper_copy_id_fkey"
            columns: ["topper_copy_id"]
            isOneToOne: false
            referencedRelation: "sociology_topper_copies"
            referencedColumns: ["id"]
          },
        ]
      }
      sociology_topper_questions: {
        Row: {
          created_at: string
          embedding: string | null
          id: string
          is_approved: boolean
          ocr_text: string | null
          page_end: number | null
          page_start: number | null
          paper: string | null
          question_number: string | null
          question_text: string
          section: string | null
          source: string | null
          topper_copy_id: string
          updated_at: string
          year: number | null
        }
        Insert: {
          created_at?: string
          embedding?: string | null
          id?: string
          is_approved?: boolean
          ocr_text?: string | null
          page_end?: number | null
          page_start?: number | null
          paper?: string | null
          question_number?: string | null
          question_text: string
          section?: string | null
          source?: string | null
          topper_copy_id: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          created_at?: string
          embedding?: string | null
          id?: string
          is_approved?: boolean
          ocr_text?: string | null
          page_end?: number | null
          page_start?: number | null
          paper?: string | null
          question_number?: string | null
          question_text?: string
          section?: string | null
          source?: string | null
          topper_copy_id?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sociology_topper_questions_topper_copy_id_fkey"
            columns: ["topper_copy_id"]
            isOneToOne: false
            referencedRelation: "sociology_topper_copies"
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
