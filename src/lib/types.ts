// =====================================================
// SUPABASE DATABASE TYPES (Auto-generated from schema)
// =====================================================

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type UserRole = 'student' | 'mentor' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';
export type NotificationType = 'achievement' | 'recommendation' | 'social' | 'system' | 'reminder' | 'payment' | 'class_update' | 'chat_message';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
export type SubscriptionPlan = 'free' | 'basic' | 'premium' | 'enterprise';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ModuleStatus = 'locked' | 'available' | 'in_progress' | 'completed';
export type MessageType = 'text' | 'image' | 'file' | 'system' | 'ai_response';

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    auth_id: string;
                    email: string;
                    name: string;
                    avatar_url: string | null;
                    bio: string | null;
                    phone: string | null;
                    location: string | null;
                    class_grade: string | null;
                    language: string;
                    role: UserRole;
                    status: UserStatus;
                    streak_count: number;
                    total_points: number;
                    current_level: number;
                    xp_current: number;
                    xp_next_level: number;
                    interests: string[];
                    goals: string[];
                    preferred_learning_style: string | null;
                    notification_enabled: boolean;
                    email_notifications: boolean;
                    dark_mode: boolean;
                    fcm_token: string | null;
                    device_info: Json | null;
                    subscription_plan: SubscriptionPlan;
                    subscription_expires_at: string | null;
                    last_active_at: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    auth_id: string;
                    email: string;
                    name: string;
                    avatar_url?: string | null;
                    bio?: string | null;
                    phone?: string | null;
                    location?: string | null;
                    class_grade?: string | null;
                    language?: string;
                    role?: UserRole;
                    status?: UserStatus;
                    streak_count?: number;
                    total_points?: number;
                    current_level?: number;
                    xp_current?: number;
                    xp_next_level?: number;
                    interests?: string[];
                    goals?: string[];
                    preferred_learning_style?: string | null;
                    notification_enabled?: boolean;
                    email_notifications?: boolean;
                    dark_mode?: boolean;
                    fcm_token?: string | null;
                    device_info?: Json | null;
                    subscription_plan?: SubscriptionPlan;
                    subscription_expires_at?: string | null;
                };
                Update: Partial<Database['public']['Tables']['users']['Insert']>;
            };
            user_settings: {
                Row: {
                    id: string;
                    user_id: string;
                    profile_visibility: string;
                    show_email: boolean;
                    show_phone: boolean;
                    show_progress: boolean;
                    show_achievements: boolean;
                    push_notifications: boolean;
                    email_digest: string;
                    notification_sound: boolean;
                    vibration: boolean;
                    daily_goal_minutes: number;
                    reminder_time: string;
                    weekend_reminders: boolean;
                    auto_play_videos: boolean;
                    download_over_wifi_only: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    profile_visibility?: string;
                    show_email?: boolean;
                    show_phone?: boolean;
                    show_progress?: boolean;
                    show_achievements?: boolean;
                    push_notifications?: boolean;
                    email_digest?: string;
                    notification_sound?: boolean;
                    vibration?: boolean;
                    daily_goal_minutes?: number;
                    reminder_time?: string;
                    weekend_reminders?: boolean;
                    auto_play_videos?: boolean;
                    download_over_wifi_only?: boolean;
                };
                Update: Partial<Database['public']['Tables']['user_settings']['Insert']>;
            };
            career_paths: {
                Row: {
                    id: string;
                    title: string;
                    slug: string;
                    industry: string;
                    description: string | null;
                    long_description: string | null;
                    salary_range: string | null;
                    growth_percentage: string | null;
                    demand_level: string;
                    after_class: string | null;
                    required_skills: string[];
                    preferred_skills: string[];
                    education_requirements: string[];
                    roadmap: Json;
                    icon_name: string | null;
                    color: string | null;
                    image_url: string | null;
                    total_learners: number;
                    average_rating: number;
                    status: ContentStatus;
                    featured: boolean;
                    order_index: number;
                    title_hi: string | null;
                    description_hi: string | null;
                    created_by: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    title: string;
                    slug: string;
                    industry: string;
                    description?: string | null;
                    long_description?: string | null;
                    salary_range?: string | null;
                    growth_percentage?: string | null;
                    demand_level?: string;
                    after_class?: string | null;
                    required_skills?: string[];
                    preferred_skills?: string[];
                    education_requirements?: string[];
                    roadmap?: Json;
                    icon_name?: string | null;
                    color?: string | null;
                    image_url?: string | null;
                    total_learners?: number;
                    average_rating?: number;
                    status?: ContentStatus;
                    featured?: boolean;
                    order_index?: number;
                    title_hi?: string | null;
                    description_hi?: string | null;
                    created_by?: string | null;
                };
                Update: Partial<Database['public']['Tables']['career_paths']['Insert']>;
            };
            learning_paths: {
                Row: {
                    id: string;
                    career_path_id: string | null;
                    title: string;
                    slug: string;
                    description: string | null;
                    difficulty: string;
                    duration_hours: number | null;
                    total_modules: number;
                    total_lessons: number;
                    image_url: string | null;
                    preview_video_url: string | null;
                    tags: string[];
                    skills_gained: string[];
                    prerequisites: string[];
                    total_enrollments: number;
                    completion_rate: number;
                    average_rating: number;
                    total_ratings: number;
                    status: ContentStatus;
                    featured: boolean;
                    order_index: number;
                    title_hi: string | null;
                    description_hi: string | null;
                    created_by: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    career_path_id?: string | null;
                    title: string;
                    slug: string;
                    description?: string | null;
                    difficulty?: string;
                    duration_hours?: number | null;
                    total_modules?: number;
                    total_lessons?: number;
                    image_url?: string | null;
                    preview_video_url?: string | null;
                    tags?: string[];
                    skills_gained?: string[];
                    prerequisites?: string[];
                    status?: ContentStatus;
                    featured?: boolean;
                    order_index?: number;
                    title_hi?: string | null;
                    description_hi?: string | null;
                    created_by?: string | null;
                };
                Update: Partial<Database['public']['Tables']['learning_paths']['Insert']>;
            };
            modules: {
                Row: {
                    id: string;
                    learning_path_id: string;
                    title: string;
                    description: string | null;
                    order_index: number;
                    duration_minutes: number;
                    total_lessons: number;
                    content_type: string;
                    prerequisites: string[];
                    title_hi: string | null;
                    description_hi: string | null;
                    status: ContentStatus;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    learning_path_id: string;
                    title: string;
                    description?: string | null;
                    order_index: number;
                    duration_minutes?: number;
                    total_lessons?: number;
                    content_type?: string;
                    prerequisites?: string[];
                    title_hi?: string | null;
                    description_hi?: string | null;
                    status?: ContentStatus;
                };
                Update: Partial<Database['public']['Tables']['modules']['Insert']>;
            };
            lessons: {
                Row: {
                    id: string;
                    module_id: string;
                    title: string;
                    description: string | null;
                    order_index: number;
                    duration_minutes: number;
                    content_type: string;
                    video_url: string | null;
                    content_html: string | null;
                    content_markdown: string | null;
                    resources: Json;
                    quiz_data: Json | null;
                    passing_score: number;
                    xp_reward: number;
                    title_hi: string | null;
                    content_html_hi: string | null;
                    status: ContentStatus;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    module_id: string;
                    title: string;
                    description?: string | null;
                    order_index: number;
                    duration_minutes?: number;
                    content_type: string;
                    video_url?: string | null;
                    content_html?: string | null;
                    content_markdown?: string | null;
                    resources?: Json;
                    quiz_data?: Json | null;
                    passing_score?: number;
                    xp_reward?: number;
                    title_hi?: string | null;
                    content_html_hi?: string | null;
                    status?: ContentStatus;
                };
                Update: Partial<Database['public']['Tables']['lessons']['Insert']>;
            };
            user_progress: {
                Row: {
                    id: string;
                    user_id: string;
                    learning_path_id: string;
                    enrolled_at: string;
                    started_at: string | null;
                    completed_at: string | null;
                    progress_percentage: number;
                    completed_modules: number;
                    completed_lessons: number;
                    total_time_spent_minutes: number;
                    current_module_id: string | null;
                    current_lesson_id: string | null;
                    average_quiz_score: number;
                    last_accessed_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    learning_path_id: string;
                    enrolled_at?: string;
                    started_at?: string | null;
                    completed_at?: string | null;
                    progress_percentage?: number;
                    completed_modules?: number;
                    completed_lessons?: number;
                    total_time_spent_minutes?: number;
                    current_module_id?: string | null;
                    current_lesson_id?: string | null;
                    average_quiz_score?: number;
                };
                Update: Partial<Database['public']['Tables']['user_progress']['Insert']>;
            };
            lesson_progress: {
                Row: {
                    id: string;
                    user_id: string;
                    lesson_id: string;
                    module_id: string;
                    learning_path_id: string;
                    status: ModuleStatus;
                    started_at: string | null;
                    completed_at: string | null;
                    video_progress_seconds: number;
                    video_completed: boolean;
                    quiz_attempts: number;
                    best_quiz_score: number;
                    last_quiz_score: number;
                    quiz_answers: Json | null;
                    time_spent_minutes: number;
                    user_notes: string | null;
                    is_bookmarked: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    lesson_id: string;
                    module_id: string;
                    learning_path_id: string;
                    status?: ModuleStatus;
                    started_at?: string | null;
                    completed_at?: string | null;
                    video_progress_seconds?: number;
                    video_completed?: boolean;
                    quiz_attempts?: number;
                    best_quiz_score?: number;
                    last_quiz_score?: number;
                    quiz_answers?: Json | null;
                    time_spent_minutes?: number;
                    user_notes?: string | null;
                    is_bookmarked?: boolean;
                };
                Update: Partial<Database['public']['Tables']['lesson_progress']['Insert']>;
            };
            ai_recommendations: {
                Row: {
                    id: string;
                    user_id: string;
                    suggested_careers: string[];
                    suggested_learning_paths: string[];
                    confidence_score: number;
                    user_interests: string[];
                    user_strengths: string[];
                    user_class: string | null;
                    ai_model: string;
                    prompt_used: string | null;
                    raw_response: Json | null;
                    user_rating: number | null;
                    user_feedback: string | null;
                    was_helpful: boolean | null;
                    generated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    suggested_careers?: string[];
                    suggested_learning_paths?: string[];
                    confidence_score?: number;
                    user_interests?: string[];
                    user_strengths?: string[];
                    user_class?: string | null;
                    ai_model?: string;
                    prompt_used?: string | null;
                    raw_response?: Json | null;
                    user_rating?: number | null;
                    user_feedback?: string | null;
                    was_helpful?: boolean | null;
                };
                Update: Partial<Database['public']['Tables']['ai_recommendations']['Insert']>;
            };
            ai_chat_history: {
                Row: {
                    id: string;
                    user_id: string;
                    session_id: string;
                    message_type: string;
                    content: string;
                    ai_model: string | null;
                    tokens_used: number | null;
                    attachments: Json;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    session_id?: string;
                    message_type: string;
                    content: string;
                    ai_model?: string | null;
                    tokens_used?: number | null;
                    attachments?: Json;
                };
                Update: Partial<Database['public']['Tables']['ai_chat_history']['Insert']>;
            };
            chat_rooms: {
                Row: {
                    id: string;
                    name: string | null;
                    description: string | null;
                    is_group: boolean;
                    is_ai_chat: boolean;
                    image_url: string | null;
                    created_by: string | null;
                    last_message_at: string | null;
                    last_message_preview: string | null;
                    message_count: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name?: string | null;
                    description?: string | null;
                    is_group?: boolean;
                    is_ai_chat?: boolean;
                    image_url?: string | null;
                    created_by?: string | null;
                    last_message_at?: string | null;
                    last_message_preview?: string | null;
                    message_count?: number;
                };
                Update: Partial<Database['public']['Tables']['chat_rooms']['Insert']>;
            };
            chat_room_members: {
                Row: {
                    id: string;
                    room_id: string;
                    user_id: string;
                    role: string;
                    is_muted: boolean;
                    is_pinned: boolean;
                    unread_count: number;
                    joined_at: string;
                    last_read_at: string;
                };
                Insert: {
                    id?: string;
                    room_id: string;
                    user_id: string;
                    role?: string;
                    is_muted?: boolean;
                    is_pinned?: boolean;
                    unread_count?: number;
                };
                Update: Partial<Database['public']['Tables']['chat_room_members']['Insert']>;
            };
            chat_messages: {
                Row: {
                    id: string;
                    room_id: string;
                    sender_id: string | null;
                    message_type: MessageType;
                    content: string | null;
                    media_url: string | null;
                    media_type: string | null;
                    media_size: number | null;
                    reply_to_id: string | null;
                    is_edited: boolean;
                    is_deleted: boolean;
                    read_by: string[];
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    room_id: string;
                    sender_id?: string | null;
                    message_type?: MessageType;
                    content?: string | null;
                    media_url?: string | null;
                    media_type?: string | null;
                    media_size?: number | null;
                    reply_to_id?: string | null;
                    is_edited?: boolean;
                    is_deleted?: boolean;
                    read_by?: string[];
                };
                Update: Partial<Database['public']['Tables']['chat_messages']['Insert']>;
            };
            notifications: {
                Row: {
                    id: string;
                    user_id: string;
                    type: NotificationType;
                    title: string;
                    message: string;
                    action_type: string | null;
                    action_data: Json | null;
                    icon_name: string | null;
                    icon_color: string | null;
                    image_url: string | null;
                    is_read: boolean;
                    read_at: string | null;
                    fcm_sent: boolean;
                    fcm_message_id: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    type: NotificationType;
                    title: string;
                    message: string;
                    action_type?: string | null;
                    action_data?: Json | null;
                    icon_name?: string | null;
                    icon_color?: string | null;
                    image_url?: string | null;
                    is_read?: boolean;
                    read_at?: string | null;
                    fcm_sent?: boolean;
                    fcm_message_id?: string | null;
                };
                Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
            };
            achievements: {
                Row: {
                    id: string;
                    name: string;
                    description: string | null;
                    icon_name: string | null;
                    icon_color: string | null;
                    badge_image_url: string | null;
                    requirement_type: string | null;
                    requirement_value: number | null;
                    xp_reward: number;
                    points_reward: number;
                    rarity: string;
                    status: ContentStatus;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    description?: string | null;
                    icon_name?: string | null;
                    icon_color?: string | null;
                    badge_image_url?: string | null;
                    requirement_type?: string | null;
                    requirement_value?: number | null;
                    xp_reward?: number;
                    points_reward?: number;
                    rarity?: string;
                    status?: ContentStatus;
                };
                Update: Partial<Database['public']['Tables']['achievements']['Insert']>;
            };
            user_achievements: {
                Row: {
                    id: string;
                    user_id: string;
                    achievement_id: string;
                    earned_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    achievement_id: string;
                };
                Update: Partial<Database['public']['Tables']['user_achievements']['Insert']>;
            };
            certificates: {
                Row: {
                    id: string;
                    user_id: string;
                    learning_path_id: string | null;
                    certificate_number: string;
                    title: string;
                    verification_url: string | null;
                    pdf_url: string | null;
                    issued_at: string;
                    expires_at: string | null;
                    final_score: number | null;
                    time_spent_hours: number | null;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    learning_path_id?: string | null;
                    certificate_number: string;
                    title: string;
                    verification_url?: string | null;
                    pdf_url?: string | null;
                    expires_at?: string | null;
                    final_score?: number | null;
                    time_spent_hours?: number | null;
                };
                Update: Partial<Database['public']['Tables']['certificates']['Insert']>;
            };
            daily_streaks: {
                Row: {
                    id: string;
                    user_id: string;
                    date: string;
                    lessons_completed: number;
                    time_spent_minutes: number;
                    xp_earned: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    date: string;
                    lessons_completed?: number;
                    time_spent_minutes?: number;
                    xp_earned?: number;
                };
                Update: Partial<Database['public']['Tables']['daily_streaks']['Insert']>;
            };
            community_classes: {
                Row: {
                    id: string;
                    mentor_id: string;
                    title: string;
                    description: string | null;
                    scheduled_at: string | null;
                    duration_minutes: number;
                    is_live: boolean;
                    content_type: string;
                    video_url: string | null;
                    content_html: string | null;
                    resources: Json;
                    thumbnail_url: string | null;
                    is_free: boolean;
                    price_amount: number;
                    price_currency: string;
                    total_enrollments: number;
                    average_rating: number;
                    total_ratings: number;
                    tags: string[];
                    category: string | null;
                    status: ContentStatus;
                    published_at: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    mentor_id: string;
                    title: string;
                    description?: string | null;
                    scheduled_at?: string | null;
                    duration_minutes?: number;
                    is_live?: boolean;
                    content_type?: string;
                    video_url?: string | null;
                    content_html?: string | null;
                    resources?: Json;
                    thumbnail_url?: string | null;
                    is_free?: boolean;
                    price_amount?: number;
                    price_currency?: string;
                    tags?: string[];
                    category?: string | null;
                    status?: ContentStatus;
                    published_at?: string | null;
                };
                Update: Partial<Database['public']['Tables']['community_classes']['Insert']>;
            };
            class_enrollments: {
                Row: {
                    id: string;
                    class_id: string;
                    user_id: string;
                    enrolled_at: string;
                    completed_at: string | null;
                    rating: number | null;
                    review: string | null;
                };
                Insert: {
                    id?: string;
                    class_id: string;
                    user_id: string;
                    rating?: number | null;
                    review?: string | null;
                };
                Update: Partial<Database['public']['Tables']['class_enrollments']['Insert']>;
            };
            payments: {
                Row: {
                    id: string;
                    user_id: string | null;
                    amount: number;
                    currency: string;
                    status: PaymentStatus;
                    payment_method: string | null;
                    payment_gateway: string;
                    gateway_order_id: string | null;
                    gateway_payment_id: string | null;
                    gateway_signature: string | null;
                    gateway_response: Json | null;
                    purchase_type: string | null;
                    purchase_id: string | null;
                    paid_at: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id?: string | null;
                    amount: number;
                    currency?: string;
                    status?: PaymentStatus;
                    payment_method?: string | null;
                    payment_gateway?: string;
                    gateway_order_id?: string | null;
                    gateway_payment_id?: string | null;
                    gateway_signature?: string | null;
                    gateway_response?: Json | null;
                    purchase_type?: string | null;
                    purchase_id?: string | null;
                    paid_at?: string | null;
                };
                Update: Partial<Database['public']['Tables']['payments']['Insert']>;
            };
            subscriptions: {
                Row: {
                    id: string;
                    user_id: string;
                    plan: SubscriptionPlan;
                    amount: number;
                    currency: string;
                    billing_cycle: string;
                    status: string;
                    starts_at: string;
                    expires_at: string;
                    cancelled_at: string | null;
                    gateway_subscription_id: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    plan: SubscriptionPlan;
                    amount: number;
                    currency?: string;
                    billing_cycle?: string;
                    status?: string;
                    starts_at: string;
                    expires_at: string;
                    cancelled_at?: string | null;
                    gateway_subscription_id?: string | null;
                };
                Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>;
            };
            bookmarks: {
                Row: {
                    id: string;
                    user_id: string;
                    bookmark_type: string;
                    target_id: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    bookmark_type: string;
                    target_id: string;
                };
                Update: Partial<Database['public']['Tables']['bookmarks']['Insert']>;
            };
            user_connections: {
                Row: {
                    id: string;
                    follower_id: string;
                    following_id: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    follower_id: string;
                    following_id: string;
                };
                Update: Partial<Database['public']['Tables']['user_connections']['Insert']>;
            };
            skill_assessments: {
                Row: {
                    id: string;
                    user_id: string;
                    skill_name: string;
                    proficiency_level: number;
                    last_assessed_at: string | null;
                    assessment_score: number | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    skill_name: string;
                    proficiency_level?: number;
                    last_assessed_at?: string | null;
                    assessment_score?: number | null;
                };
                Update: Partial<Database['public']['Tables']['skill_assessments']['Insert']>;
            };
        };
    };
}

// Helper types for easier usage
export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

export type CareerPath = Database['public']['Tables']['career_paths']['Row'];
export type LearningPath = Database['public']['Tables']['learning_paths']['Row'];
export type Module = Database['public']['Tables']['modules']['Row'];
export type Lesson = Database['public']['Tables']['lessons']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];
export type LessonProgress = Database['public']['Tables']['lesson_progress']['Row'];
export type AIRecommendation = Database['public']['Tables']['ai_recommendations']['Row'];
export type AIChatHistory = Database['public']['Tables']['ai_chat_history']['Row'];
export type ChatRoom = Database['public']['Tables']['chat_rooms']['Row'];
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];
export type Achievement = Database['public']['Tables']['achievements']['Row'];
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row'];
export type Certificate = Database['public']['Tables']['certificates']['Row'];
export type DailyStreak = Database['public']['Tables']['daily_streaks']['Row'];
export type CommunityClass = Database['public']['Tables']['community_classes']['Row'];
export type Payment = Database['public']['Tables']['payments']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];
export type Bookmark = Database['public']['Tables']['bookmarks']['Row'];
export type SkillAssessment = Database['public']['Tables']['skill_assessments']['Row'];
