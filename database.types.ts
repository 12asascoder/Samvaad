export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          learning_style: string
          communication_preference: string
          preferred_language: string
          timezone: string
          accessibility_settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          learning_style?: string
          communication_preference?: string
          preferred_language?: string
          timezone?: string
          accessibility_settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          learning_style?: string
          communication_preference?: string
          preferred_language?: string
          timezone?: string
          accessibility_settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      cognitive_twins: {
        Row: {
          id: string
          user_id: string
          comprehension_score: number
          communication_score: number
          adaptability_score: number
          learning_velocity: number
          optimal_learning_hours: Json
          strengths: Json
          areas_for_improvement: Json
          neural_patterns: Json
          last_sync_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          comprehension_score?: number
          communication_score?: number
          adaptability_score?: number
          learning_velocity?: number
          optimal_learning_hours?: Json
          strengths?: Json
          areas_for_improvement?: Json
          neural_patterns?: Json
          last_sync_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          comprehension_score?: number
          communication_score?: number
          adaptability_score?: number
          learning_velocity?: number
          optimal_learning_hours?: Json
          strengths?: Json
          areas_for_improvement?: Json
          neural_patterns?: Json
          last_sync_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      learning_sessions: {
        Row: {
          id: string
          user_id: string
          topic: string
          duration_minutes: number
          comprehension_level: number | null
          engagement_score: number | null
          mistakes_count: number
          corrections_made: number
          learning_style_used: string | null
          session_notes: string | null
          started_at: string
          ended_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          topic: string
          duration_minutes?: number
          comprehension_level?: number | null
          engagement_score?: number | null
          mistakes_count?: number
          corrections_made?: number
          learning_style_used?: string | null
          session_notes?: string | null
          started_at?: string
          ended_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          topic?: string
          duration_minutes?: number
          comprehension_level?: number | null
          engagement_score?: number | null
          mistakes_count?: number
          corrections_made?: number
          learning_style_used?: string | null
          session_notes?: string | null
          started_at?: string
          ended_at?: string | null
          created_at?: string
        }
      }
      learning_goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          target_date: string | null
          progress: number
          status: string
          category: string | null
          milestones: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          target_date?: string | null
          progress?: number
          status?: string
          category?: string | null
          milestones?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          target_date?: string | null
          progress?: number
          status?: string
          category?: string | null
          milestones?: Json
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          title: string | null
          mode: string
          context: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          mode: string
          context?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          mode?: string
          context?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          role: string
          content: string
          message_type: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          role: string
          content: string
          message_type?: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          role?: string
          content?: string
          message_type?: string
          metadata?: Json
          created_at?: string
        }
      }
      advocacy_templates: {
        Row: {
          id: string
          title: string
          category: string
          description: string | null
          template_content: string
          variables: Json
          cultural_context: string | null
          formality_level: string
          success_rate: number | null
          usage_count: number
          is_public: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          category: string
          description?: string | null
          template_content: string
          variables?: Json
          cultural_context?: string | null
          formality_level?: string
          success_rate?: number | null
          usage_count?: number
          is_public?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          category?: string
          description?: string | null
          template_content?: string
          variables?: Json
          cultural_context?: string | null
          formality_level?: string
          success_rate?: number | null
          usage_count?: number
          is_public?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      advocacy_sessions: {
        Row: {
          id: string
          user_id: string
          conversation_id: string | null
          template_id: string | null
          scenario_type: string
          context: Json
          generated_message: string | null
          outcome: string | null
          feedback: string | null
          rating: number | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          conversation_id?: string | null
          template_id?: string | null
          scenario_type: string
          context: Json
          generated_message?: string | null
          outcome?: string | null
          feedback?: string | null
          rating?: number | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          conversation_id?: string | null
          template_id?: string | null
          scenario_type?: string
          context?: Json
          generated_message?: string | null
          outcome?: string | null
          feedback?: string | null
          rating?: number | null
          created_at?: string
          completed_at?: string | null
        }
      }
      neural_insights: {
        Row: {
          id: string
          user_id: string
          insight_type: string
          title: string
          description: string
          priority: string
          is_read: boolean
          is_actionable: boolean
          action_taken: boolean
          metadata: Json
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          insight_type: string
          title: string
          description: string
          priority?: string
          is_read?: boolean
          is_actionable?: boolean
          action_taken?: boolean
          metadata?: Json
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          insight_type?: string
          title?: string
          description?: string
          priority?: string
          is_read?: boolean
          is_actionable?: boolean
          action_taken?: boolean
          metadata?: Json
          expires_at?: string | null
          created_at?: string
        }
      }
      voice_profiles: {
        Row: {
          id: string
          user_id: string
          voice_name: string
          voice_settings: Json
          language: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          voice_name: string
          voice_settings?: Json
          language?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          voice_name?: string
          voice_settings?: Json
          language?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])      
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }     
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &       
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]  
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }     
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]  
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }     
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]    
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }      
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]  
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]    
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {     
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }    
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]    
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const