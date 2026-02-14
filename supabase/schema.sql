-- =====================================================
-- MITRA APP - COMPLETE SUPABASE DATABASE SCHEMA
-- Career Guidance AI Learning Platform
-- =====================================================
-- This schema supports:
-- ✅ User roles (Student, Mentor, Admin)
-- ✅ Real-time subscriptions
-- ✅ AI Career Recommendations
-- ✅ Learning Paths & Progress Tracking
-- ✅ Chat System (1-on-1 & Groups)
-- ✅ Notifications with FCM
-- ✅ Payment Integration
-- ✅ Community Classes/Content
-- ✅ Gamification (Streaks, Points, Badges)
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUMS
-- =====================================================

-- User roles enum
CREATE TYPE user_role AS ENUM ('student', 'mentor', 'admin');

-- User status enum
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'pending_verification');

-- Notification type enum
CREATE TYPE notification_type AS ENUM (
    'achievement', 
    'recommendation', 
    'social', 
    'system', 
    'reminder',
    'payment',
    'class_update',
    'chat_message'
);

-- Payment status enum
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded', 'cancelled');

-- Subscription plan enum
CREATE TYPE subscription_plan AS ENUM ('free', 'basic', 'premium', 'enterprise');

-- Content status enum
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Module status enum
CREATE TYPE module_status AS ENUM ('locked', 'available', 'in_progress', 'completed');

-- Message type enum
CREATE TYPE message_type AS ENUM ('text', 'image', 'file', 'system', 'ai_response');

-- =====================================================
-- 1. USERS TABLE (Core user data)
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID UNIQUE NOT NULL, -- Links to Supabase Auth
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    phone VARCHAR(20),
    location VARCHAR(255),
    class_grade VARCHAR(50), -- e.g., "10th", "12th", "College"
    language VARCHAR(10) DEFAULT 'en', -- 'en', 'hi', etc.
    role user_role DEFAULT 'student',
    status user_status DEFAULT 'pending_verification',
    
    -- Gamification
    streak_count INTEGER DEFAULT 0,
    total_points INTEGER DEFAULT 0,
    current_level INTEGER DEFAULT 1,
    xp_current INTEGER DEFAULT 0,
    xp_next_level INTEGER DEFAULT 1000,
    
    -- Preferences
    interests TEXT[] DEFAULT '{}',
    goals TEXT[] DEFAULT '{}',
    preferred_learning_style VARCHAR(50), -- 'visual', 'reading', 'hands-on'
    notification_enabled BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    dark_mode BOOLEAN DEFAULT FALSE,
    
    -- FCM Token for push notifications
    fcm_token TEXT,
    device_info JSONB,
    
    -- Subscription
    subscription_plan subscription_plan DEFAULT 'free',
    subscription_expires_at TIMESTAMPTZ,
    
    -- Timestamps
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- =====================================================
-- 2. USER SETTINGS TABLE
-- =====================================================
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Privacy Settings
    profile_visibility VARCHAR(20) DEFAULT 'public', -- 'public', 'private', 'connections'
    show_email BOOLEAN DEFAULT FALSE,
    show_phone BOOLEAN DEFAULT FALSE,
    show_progress BOOLEAN DEFAULT TRUE,
    show_achievements BOOLEAN DEFAULT TRUE,
    
    -- Notification Settings
    push_notifications BOOLEAN DEFAULT TRUE,
    email_digest VARCHAR(20) DEFAULT 'daily', -- 'none', 'daily', 'weekly'
    notification_sound BOOLEAN DEFAULT TRUE,
    vibration BOOLEAN DEFAULT TRUE,
    
    -- Learning Preferences
    daily_goal_minutes INTEGER DEFAULT 30,
    reminder_time TIME DEFAULT '09:00:00',
    weekend_reminders BOOLEAN DEFAULT TRUE,
    
    -- App Settings
    auto_play_videos BOOLEAN DEFAULT TRUE,
    download_over_wifi_only BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id)
);

-- =====================================================
-- 3. CAREER PATHS TABLE
-- =====================================================
CREATE TABLE career_paths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    industry VARCHAR(100) NOT NULL,
    description TEXT,
    long_description TEXT,
    
    -- Career Details
    salary_range VARCHAR(100),
    growth_percentage VARCHAR(20),
    demand_level VARCHAR(20) DEFAULT 'high', -- 'low', 'medium', 'high'
    after_class VARCHAR(50), -- "10th", "12th", etc.
    
    -- Skills & Requirements
    required_skills TEXT[] DEFAULT '{}',
    preferred_skills TEXT[] DEFAULT '{}',
    education_requirements TEXT[] DEFAULT '{}',
    
    -- Roadmap steps (JSON array)
    roadmap JSONB DEFAULT '[]',
    
    -- Metadata
    icon_name VARCHAR(50),
    color VARCHAR(20),
    image_url TEXT,
    
    -- Stats
    total_learners INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    
    -- Content control
    status content_status DEFAULT 'published',
    featured BOOLEAN DEFAULT FALSE,
    order_index INTEGER DEFAULT 0,
    
    -- Multi-language support
    title_hi VARCHAR(255), -- Hindi title
    description_hi TEXT, -- Hindi description
    
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_career_paths_industry ON career_paths(industry);
CREATE INDEX idx_career_paths_status ON career_paths(status);
CREATE INDEX idx_career_paths_after_class ON career_paths(after_class);

-- =====================================================
-- 4. LEARNING PATHS TABLE
-- =====================================================
CREATE TABLE learning_paths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    career_path_id UUID REFERENCES career_paths(id),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    
    -- Path details
    difficulty VARCHAR(20) DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
    duration_hours DECIMAL(5,2),
    total_modules INTEGER DEFAULT 0,
    total_lessons INTEGER DEFAULT 0,
    
    -- Media
    image_url TEXT,
    preview_video_url TEXT,
    
    -- Metadata
    tags TEXT[] DEFAULT '{}',
    skills_gained TEXT[] DEFAULT '{}',
    prerequisites TEXT[] DEFAULT '{}',
    
    -- Stats
    total_enrollments INTEGER DEFAULT 0,
    completion_rate DECIMAL(5,2) DEFAULT 0.00,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INTEGER DEFAULT 0,
    
    -- Content control
    status content_status DEFAULT 'published',
    featured BOOLEAN DEFAULT FALSE,
    order_index INTEGER DEFAULT 0,
    
    -- Multi-language
    title_hi VARCHAR(255),
    description_hi TEXT,
    
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_learning_paths_career ON learning_paths(career_path_id);
CREATE INDEX idx_learning_paths_status ON learning_paths(status);

-- =====================================================
-- 5. MODULES TABLE (Learning path modules)
-- =====================================================
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    learning_path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Module details
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER DEFAULT 0,
    total_lessons INTEGER DEFAULT 0,
    
    -- Content
    content_type VARCHAR(50) DEFAULT 'mixed', -- 'video', 'reading', 'interactive', 'mixed'
    
    -- Prerequisites (other module IDs)
    prerequisites UUID[] DEFAULT '{}',
    
    -- Multi-language
    title_hi VARCHAR(255),
    description_hi TEXT,
    
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_modules_learning_path ON modules(learning_path_id);

-- =====================================================
-- 6. LESSONS TABLE
-- =====================================================
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Lesson content
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER DEFAULT 0,
    content_type VARCHAR(50) NOT NULL, -- 'video', 'text', 'quiz', 'assignment', 'interactive'
    
    -- Content data
    video_url TEXT,
    content_html TEXT,
    content_markdown TEXT,
    resources JSONB DEFAULT '[]', -- Additional resources/attachments
    
    -- Quiz settings (if content_type is 'quiz')
    quiz_data JSONB,
    passing_score INTEGER DEFAULT 70,
    
    -- XP and points
    xp_reward INTEGER DEFAULT 10,
    
    -- Multi-language
    title_hi VARCHAR(255),
    content_html_hi TEXT,
    
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lessons_module ON lessons(module_id);

-- =====================================================
-- 7. USER PROGRESS TABLE
-- =====================================================
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    learning_path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
    
    -- Progress tracking
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    
    -- Stats
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    completed_modules INTEGER DEFAULT 0,
    completed_lessons INTEGER DEFAULT 0,
    total_time_spent_minutes INTEGER DEFAULT 0,
    
    -- Current position
    current_module_id UUID REFERENCES modules(id),
    current_lesson_id UUID REFERENCES lessons(id),
    
    -- Performance
    average_quiz_score DECIMAL(5,2) DEFAULT 0.00,
    
    last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, learning_path_id)
);

CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_path ON user_progress(learning_path_id);

-- =====================================================
-- 8. LESSON PROGRESS TABLE (Granular lesson tracking)
-- =====================================================
CREATE TABLE lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    learning_path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
    
    -- Status
    status module_status DEFAULT 'available',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    
    -- For video lessons
    video_progress_seconds INTEGER DEFAULT 0,
    video_completed BOOLEAN DEFAULT FALSE,
    
    -- For quiz lessons
    quiz_attempts INTEGER DEFAULT 0,
    best_quiz_score INTEGER DEFAULT 0,
    last_quiz_score INTEGER DEFAULT 0,
    quiz_answers JSONB,
    
    -- Time tracking
    time_spent_minutes INTEGER DEFAULT 0,
    
    -- Notes/bookmarks
    user_notes TEXT,
    is_bookmarked BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson ON lesson_progress(lesson_id);

-- =====================================================
-- 9. AI RECOMMENDATIONS TABLE
-- =====================================================
CREATE TABLE ai_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Recommendation data
    suggested_careers TEXT[] DEFAULT '{}',
    suggested_learning_paths UUID[] DEFAULT '{}',
    confidence_score DECIMAL(3,2) DEFAULT 0.00,
    
    -- Input data used for recommendation
    user_interests TEXT[] DEFAULT '{}',
    user_strengths TEXT[] DEFAULT '{}',
    user_class VARCHAR(50),
    
    -- AI metadata
    ai_model VARCHAR(100) DEFAULT 'gemini-pro',
    prompt_used TEXT,
    raw_response JSONB,
    
    -- Feedback
    user_rating INTEGER, -- 1-5
    user_feedback TEXT,
    was_helpful BOOLEAN,
    
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_recommendations_user ON ai_recommendations(user_id);

-- =====================================================
-- 10. AI CHAT HISTORY TABLE
-- =====================================================
CREATE TABLE ai_chat_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID DEFAULT uuid_generate_v4(),
    
    -- Message content
    message_type VARCHAR(20) NOT NULL, -- 'user', 'assistant'
    content TEXT NOT NULL,
    
    -- AI metadata
    ai_model VARCHAR(100),
    tokens_used INTEGER,
    
    -- Attachments
    attachments JSONB DEFAULT '[]',
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_chat_user ON ai_chat_history(user_id);
CREATE INDEX idx_ai_chat_session ON ai_chat_history(session_id);

-- =====================================================
-- 11. CHAT ROOMS TABLE
-- =====================================================
CREATE TABLE chat_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    description TEXT,
    
    -- Room type
    is_group BOOLEAN DEFAULT FALSE,
    is_ai_chat BOOLEAN DEFAULT FALSE,
    
    -- Group settings
    image_url TEXT,
    created_by UUID REFERENCES users(id),
    
    -- Metadata
    last_message_at TIMESTAMPTZ,
    last_message_preview TEXT,
    message_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 12. CHAT ROOM MEMBERS TABLE
-- =====================================================
CREATE TABLE chat_room_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Member role in group
    role VARCHAR(20) DEFAULT 'member', -- 'admin', 'moderator', 'member'
    
    -- Status
    is_muted BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    unread_count INTEGER DEFAULT 0,
    
    -- Timestamps
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    last_read_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(room_id, user_id)
);

CREATE INDEX idx_chat_members_user ON chat_room_members(user_id);
CREATE INDEX idx_chat_members_room ON chat_room_members(room_id);

-- =====================================================
-- 13. CHAT MESSAGES TABLE
-- =====================================================
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Message content
    message_type message_type DEFAULT 'text',
    content TEXT,
    
    -- Media
    media_url TEXT,
    media_type VARCHAR(50),
    media_size INTEGER,
    
    -- Reply to
    reply_to_id UUID REFERENCES chat_messages(id),
    
    -- Status
    is_edited BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    
    -- Read receipts (stored as array of user IDs who have read)
    read_by UUID[] DEFAULT '{}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_room ON chat_messages(room_id);
CREATE INDEX idx_chat_messages_sender ON chat_messages(sender_id);
CREATE INDEX idx_chat_messages_created ON chat_messages(created_at DESC);

-- =====================================================
-- 14. NOTIFICATIONS TABLE
-- =====================================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification content
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Action data
    action_type VARCHAR(50), -- 'navigate', 'open_url', etc.
    action_data JSONB, -- { screen: 'CareerDetail', params: { id: '...' } }
    
    -- Display
    icon_name VARCHAR(50),
    icon_color VARCHAR(20),
    image_url TEXT,
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    
    -- FCM
    fcm_sent BOOLEAN DEFAULT FALSE,
    fcm_message_id TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- =====================================================
-- 15. ACHIEVEMENTS/BADGES TABLE
-- =====================================================
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Badge visuals
    icon_name VARCHAR(50),
    icon_color VARCHAR(20),
    badge_image_url TEXT,
    
    -- Requirements
    requirement_type VARCHAR(50), -- 'streak', 'lessons_completed', 'quiz_score', etc.
    requirement_value INTEGER,
    
    -- Rewards
    xp_reward INTEGER DEFAULT 0,
    points_reward INTEGER DEFAULT 0,
    
    -- Rarity
    rarity VARCHAR(20) DEFAULT 'common', -- 'common', 'rare', 'epic', 'legendary'
    
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 16. USER ACHIEVEMENTS TABLE
-- =====================================================
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);

-- =====================================================
-- 17. CERTIFICATES TABLE
-- =====================================================
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    learning_path_id UUID REFERENCES learning_paths(id),
    
    -- Certificate details
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    
    -- Verification
    verification_url TEXT,
    pdf_url TEXT,
    
    -- Metadata
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    
    -- Stats at time of completion
    final_score DECIMAL(5,2),
    time_spent_hours DECIMAL(5,2)
);

CREATE INDEX idx_certificates_user ON certificates(user_id);

-- =====================================================
-- 18. DAILY STREAKS TABLE
-- =====================================================
CREATE TABLE daily_streaks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    date DATE NOT NULL,
    
    -- Activity data
    lessons_completed INTEGER DEFAULT 0,
    time_spent_minutes INTEGER DEFAULT 0,
    xp_earned INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, date)
);

CREATE INDEX idx_daily_streaks_user ON daily_streaks(user_id);
CREATE INDEX idx_daily_streaks_date ON daily_streaks(date DESC);

-- =====================================================
-- 19. COMMUNITY CLASSES TABLE (Mentor-created content)
-- =====================================================
CREATE TABLE community_classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Class details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Schedule
    scheduled_at TIMESTAMPTZ,
    duration_minutes INTEGER DEFAULT 60,
    is_live BOOLEAN DEFAULT FALSE,
    
    -- Content
    content_type VARCHAR(50) DEFAULT 'video', -- 'video', 'live', 'text'
    video_url TEXT,
    content_html TEXT,
    resources JSONB DEFAULT '[]',
    
    -- Media
    thumbnail_url TEXT,
    
    -- Pricing
    is_free BOOLEAN DEFAULT TRUE,
    price_amount DECIMAL(10,2) DEFAULT 0.00,
    price_currency VARCHAR(10) DEFAULT 'INR',
    
    -- Stats
    total_enrollments INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INTEGER DEFAULT 0,
    
    -- Tags for discovery
    tags TEXT[] DEFAULT '{}',
    category VARCHAR(100),
    
    status content_status DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_community_classes_mentor ON community_classes(mentor_id);
CREATE INDEX idx_community_classes_status ON community_classes(status);

-- =====================================================
-- 20. CLASS ENROLLMENTS TABLE
-- =====================================================
CREATE TABLE class_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES community_classes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Enrollment status
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    
    -- Rating
    rating INTEGER,
    review TEXT,
    
    UNIQUE(class_id, user_id)
);

CREATE INDEX idx_class_enrollments_user ON class_enrollments(user_id);

-- =====================================================
-- 21. PAYMENTS TABLE
-- =====================================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Payment details
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status payment_status DEFAULT 'pending',
    
    -- Payment method
    payment_method VARCHAR(50), -- 'razorpay', 'stripe', 'upi', etc.
    payment_gateway VARCHAR(50) DEFAULT 'razorpay',
    
    -- Gateway details
    gateway_order_id TEXT,
    gateway_payment_id TEXT,
    gateway_signature TEXT,
    gateway_response JSONB,
    
    -- What was purchased
    purchase_type VARCHAR(50), -- 'subscription', 'class', 'learning_path'
    purchase_id UUID,
    
    -- Timestamps
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);

-- =====================================================
-- 22. SUBSCRIPTIONS TABLE
-- =====================================================
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Plan details
    plan subscription_plan NOT NULL,
    
    -- Billing
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    billing_cycle VARCHAR(20) DEFAULT 'monthly', -- 'monthly', 'yearly'
    
    -- Status
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'expired', 'paused'
    
    -- Dates
    starts_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    cancelled_at TIMESTAMPTZ,
    
    -- Gateway
    gateway_subscription_id TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- =====================================================
-- 23. BOOKMARKS TABLE
-- =====================================================
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Bookmark target
    bookmark_type VARCHAR(50) NOT NULL, -- 'career', 'learning_path', 'lesson', 'class'
    target_id UUID NOT NULL,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, bookmark_type, target_id)
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);

-- =====================================================
-- 24. USER CONNECTIONS/FOLLOWING TABLE
-- =====================================================
CREATE TABLE user_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(follower_id, following_id),
    CHECK(follower_id != following_id)
);

CREATE INDEX idx_connections_follower ON user_connections(follower_id);
CREATE INDEX idx_connections_following ON user_connections(following_id);

-- =====================================================
-- 25. SKILL ASSESSMENTS TABLE
-- =====================================================
CREATE TABLE skill_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level DECIMAL(3,2) DEFAULT 0.00, -- 0.00 to 1.00
    
    -- Assessment details
    last_assessed_at TIMESTAMPTZ,
    assessment_score INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, skill_name)
);

CREATE INDEX idx_skill_assessments_user ON skill_assessments(user_id);

-- =====================================================
-- 26. ANALYTICS EVENTS TABLE
-- =====================================================
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Event details
    event_name VARCHAR(100) NOT NULL,
    event_category VARCHAR(50),
    event_data JSONB DEFAULT '{}',
    
    -- Session info
    session_id UUID,
    
    -- Device info
    device_type VARCHAR(50),
    os_name VARCHAR(50),
    app_version VARCHAR(20),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_event ON analytics_events(event_name);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);

-- =====================================================
-- 27. APP CONFIG TABLE (Admin-controlled settings)
-- =====================================================
CREATE TABLE app_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 28. CONTENT REPORTS TABLE
-- =====================================================
CREATE TABLE content_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Reported content
    content_type VARCHAR(50) NOT NULL, -- 'message', 'class', 'user', etc.
    content_id UUID NOT NULL,
    
    -- Report details
    reason VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'reviewed', 'resolved', 'dismissed'
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    action_taken TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_content_reports_status ON content_reports(status);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_career_paths_updated_at BEFORE UPDATE ON career_paths 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_paths_updated_at BEFORE UPDATE ON learning_paths 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON lesson_progress 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chat_rooms_updated_at BEFORE UPDATE ON chat_rooms 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chat_messages_updated_at BEFORE UPDATE ON chat_messages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_community_classes_updated_at BEFORE UPDATE ON community_classes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skill_assessments_updated_at BEFORE UPDATE ON skill_assessments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Function: Update user streak
-- =====================================================
CREATE OR REPLACE FUNCTION update_user_streak(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
    v_yesterday DATE;
    v_today DATE;
    v_has_yesterday BOOLEAN;
    v_has_today BOOLEAN;
BEGIN
    v_today := CURRENT_DATE;
    v_yesterday := CURRENT_DATE - INTERVAL '1 day';
    
    -- Check if user has activity today
    SELECT EXISTS(SELECT 1 FROM daily_streaks WHERE user_id = p_user_id AND date = v_today)
    INTO v_has_today;
    
    -- Check if user had activity yesterday
    SELECT EXISTS(SELECT 1 FROM daily_streaks WHERE user_id = p_user_id AND date = v_yesterday)
    INTO v_has_yesterday;
    
    IF v_has_today THEN
        IF v_has_yesterday THEN
            -- Continue streak
            UPDATE users SET streak_count = streak_count + 1, updated_at = NOW()
            WHERE id = p_user_id AND last_active_at::DATE != v_today;
        ELSE
            -- Reset streak to 1
            UPDATE users SET streak_count = 1, updated_at = NOW()
            WHERE id = p_user_id;
        END IF;
    END IF;
    
    -- Update last active
    UPDATE users SET last_active_at = NOW() WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Function: Award XP and check level up
-- =====================================================
CREATE OR REPLACE FUNCTION award_xp(p_user_id UUID, p_xp INTEGER)
RETURNS JSONB AS $$
DECLARE
    v_user users%ROWTYPE;
    v_new_xp INTEGER;
    v_leveled_up BOOLEAN := FALSE;
    v_new_level INTEGER;
BEGIN
    SELECT * INTO v_user FROM users WHERE id = p_user_id;
    
    v_new_xp := v_user.xp_current + p_xp;
    v_new_level := v_user.current_level;
    
    -- Check for level up
    WHILE v_new_xp >= v_user.xp_next_level LOOP
        v_new_xp := v_new_xp - v_user.xp_next_level;
        v_new_level := v_new_level + 1;
        v_leveled_up := TRUE;
    END LOOP;
    
    UPDATE users SET
        xp_current = v_new_xp,
        current_level = v_new_level,
        xp_next_level = v_new_level * 1000, -- Each level requires more XP
        total_points = total_points + p_xp,
        updated_at = NOW()
    WHERE id = p_user_id;
    
    RETURN jsonb_build_object(
        'leveled_up', v_leveled_up,
        'new_level', v_new_level,
        'current_xp', v_new_xp,
        'xp_needed', v_new_level * 1000
    );
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Function: Update learning path progress
-- =====================================================
CREATE OR REPLACE FUNCTION update_path_progress(p_user_id UUID, p_learning_path_id UUID)
RETURNS VOID AS $$
DECLARE
    v_total_lessons INTEGER;
    v_completed_lessons INTEGER;
    v_total_modules INTEGER;
    v_completed_modules INTEGER;
    v_progress DECIMAL(5,2);
BEGIN
    -- Count total lessons in path
    SELECT COUNT(*) INTO v_total_lessons
    FROM lessons l
    JOIN modules m ON l.module_id = m.id
    WHERE m.learning_path_id = p_learning_path_id;
    
    -- Count completed lessons
    SELECT COUNT(*) INTO v_completed_lessons
    FROM lesson_progress lp
    WHERE lp.user_id = p_user_id 
    AND lp.learning_path_id = p_learning_path_id
    AND lp.status = 'completed';
    
    -- Count total modules
    SELECT COUNT(*) INTO v_total_modules
    FROM modules WHERE learning_path_id = p_learning_path_id;
    
    -- Count completed modules (all lessons completed)
    SELECT COUNT(DISTINCT m.id) INTO v_completed_modules
    FROM modules m
    WHERE m.learning_path_id = p_learning_path_id
    AND NOT EXISTS (
        SELECT 1 FROM lessons l
        LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id AND lp.user_id = p_user_id
        WHERE l.module_id = m.id
        AND (lp.status IS NULL OR lp.status != 'completed')
    );
    
    -- Calculate progress
    IF v_total_lessons > 0 THEN
        v_progress := (v_completed_lessons::DECIMAL / v_total_lessons) * 100;
    ELSE
        v_progress := 0;
    END IF;
    
    -- Update progress record
    UPDATE user_progress SET
        progress_percentage = v_progress,
        completed_lessons = v_completed_lessons,
        completed_modules = v_completed_modules,
        last_accessed_at = NOW(),
        completed_at = CASE WHEN v_progress >= 100 THEN NOW() ELSE NULL END
    WHERE user_id = p_user_id AND learning_path_id = p_learning_path_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Function: Record daily activity
-- =====================================================
CREATE OR REPLACE FUNCTION record_daily_activity(
    p_user_id UUID,
    p_lessons_completed INTEGER DEFAULT 0,
    p_time_spent INTEGER DEFAULT 0,
    p_xp_earned INTEGER DEFAULT 0
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO daily_streaks (user_id, date, lessons_completed, time_spent_minutes, xp_earned)
    VALUES (p_user_id, CURRENT_DATE, p_lessons_completed, p_time_spent, p_xp_earned)
    ON CONFLICT (user_id, date) DO UPDATE SET
        lessons_completed = daily_streaks.lessons_completed + p_lessons_completed,
        time_spent_minutes = daily_streaks.time_spent_minutes + p_time_spent,
        xp_earned = daily_streaks.xp_earned + p_xp_earned;
    
    -- Update streak
    PERFORM update_user_streak(p_user_id);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Function: Create notification
-- =====================================================
CREATE OR REPLACE FUNCTION create_notification(
    p_user_id UUID,
    p_type notification_type,
    p_title TEXT,
    p_message TEXT,
    p_action_type TEXT DEFAULT NULL,
    p_action_data JSONB DEFAULT NULL,
    p_icon_name TEXT DEFAULT NULL,
    p_icon_color TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_notification_id UUID;
BEGIN
    INSERT INTO notifications (user_id, type, title, message, action_type, action_data, icon_name, icon_color)
    VALUES (p_user_id, p_type, p_title, p_message, p_action_type, p_action_data, p_icon_name, p_icon_color)
    RETURNING id INTO v_notification_id;
    
    RETURN v_notification_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Function: Get user stats
-- =====================================================
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_result JSONB;
    v_total_time INTEGER;
    v_completed_lessons INTEGER;
    v_avg_quiz_score DECIMAL;
    v_badges_count INTEGER;
    v_certificates_count INTEGER;
BEGIN
    -- Total time spent
    SELECT COALESCE(SUM(time_spent_minutes), 0) INTO v_total_time
    FROM daily_streaks WHERE user_id = p_user_id;
    
    -- Completed lessons
    SELECT COUNT(*) INTO v_completed_lessons
    FROM lesson_progress WHERE user_id = p_user_id AND status = 'completed';
    
    -- Average quiz score
    SELECT COALESCE(AVG(best_quiz_score), 0) INTO v_avg_quiz_score
    FROM lesson_progress WHERE user_id = p_user_id AND best_quiz_score > 0;
    
    -- Badges count
    SELECT COUNT(*) INTO v_badges_count
    FROM user_achievements WHERE user_id = p_user_id;
    
    -- Certificates count
    SELECT COUNT(*) INTO v_certificates_count
    FROM certificates WHERE user_id = p_user_id;
    
    v_result := jsonb_build_object(
        'total_time_minutes', v_total_time,
        'total_time_hours', ROUND(v_total_time::DECIMAL / 60, 1),
        'completed_lessons', v_completed_lessons,
        'average_quiz_score', ROUND(v_avg_quiz_score, 0),
        'badges_count', v_badges_count,
        'certificates_count', v_certificates_count
    );
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- USERS POLICIES
-- =====================================================

-- Users can view their own profile
CREATE POLICY users_select_own ON users FOR SELECT
    USING (auth.uid() = auth_id);

-- Users can view public profiles
CREATE POLICY users_select_public ON users FOR SELECT
    USING (status = 'active');

-- Users can update their own profile
CREATE POLICY users_update_own ON users FOR UPDATE
    USING (auth.uid() = auth_id);

-- Admin can do everything
CREATE POLICY users_admin_all ON users FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.auth_id = auth.uid() AND u.role = 'admin'
        )
    );

-- =====================================================
-- USER SETTINGS POLICIES
-- =====================================================

CREATE POLICY user_settings_own ON user_settings FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- CAREER PATHS POLICIES (Public read)
-- =====================================================

CREATE POLICY career_paths_select ON career_paths FOR SELECT
    USING (status = 'published');

CREATE POLICY career_paths_admin ON career_paths FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.auth_id = auth.uid() AND u.role = 'admin'
        )
    );

-- =====================================================
-- LEARNING PATHS POLICIES (Public read)
-- =====================================================

CREATE POLICY learning_paths_select ON learning_paths FOR SELECT
    USING (status = 'published');

CREATE POLICY learning_paths_admin ON learning_paths FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.auth_id = auth.uid() AND u.role = 'admin'
        )
    );

-- =====================================================
-- MODULES POLICIES
-- =====================================================

CREATE POLICY modules_select ON modules FOR SELECT
    USING (status = 'published');

CREATE POLICY modules_admin ON modules FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.auth_id = auth.uid() AND u.role = 'admin'
        )
    );

-- =====================================================
-- LESSONS POLICIES
-- =====================================================

CREATE POLICY lessons_select ON lessons FOR SELECT
    USING (status = 'published');

CREATE POLICY lessons_admin ON lessons FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.auth_id = auth.uid() AND u.role = 'admin'
        )
    );

-- =====================================================
-- USER PROGRESS POLICIES
-- =====================================================

CREATE POLICY user_progress_own ON user_progress FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- LESSON PROGRESS POLICIES
-- =====================================================

CREATE POLICY lesson_progress_own ON lesson_progress FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- AI RECOMMENDATIONS POLICIES
-- =====================================================

CREATE POLICY ai_recommendations_own ON ai_recommendations FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- AI CHAT HISTORY POLICIES
-- =====================================================

CREATE POLICY ai_chat_own ON ai_chat_history FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- CHAT POLICIES
-- =====================================================

-- Chat rooms: Can see rooms you're a member of
CREATE POLICY chat_rooms_member ON chat_rooms FOR SELECT
    USING (
        id IN (
            SELECT room_id FROM chat_room_members 
            WHERE user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
        )
    );

-- Chat room members: Own membership
CREATE POLICY chat_members_own ON chat_room_members FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- Chat messages: Can see messages in rooms you're a member of
CREATE POLICY chat_messages_view ON chat_messages FOR SELECT
    USING (
        room_id IN (
            SELECT room_id FROM chat_room_members 
            WHERE user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
        )
    );

-- Chat messages: Can insert if you're a member
CREATE POLICY chat_messages_insert ON chat_messages FOR INSERT
    WITH CHECK (
        room_id IN (
            SELECT room_id FROM chat_room_members 
            WHERE user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
        )
        AND sender_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- NOTIFICATIONS POLICIES
-- =====================================================

CREATE POLICY notifications_own ON notifications FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- ACHIEVEMENTS POLICIES
-- =====================================================

CREATE POLICY achievements_select ON achievements FOR SELECT
    USING (status = 'published');

CREATE POLICY user_achievements_own ON user_achievements FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- CERTIFICATES POLICIES
-- =====================================================

CREATE POLICY certificates_own ON certificates FOR SELECT
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- DAILY STREAKS POLICIES
-- =====================================================

CREATE POLICY daily_streaks_own ON daily_streaks FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- COMMUNITY CLASSES POLICIES
-- =====================================================

-- Anyone can view published classes
CREATE POLICY community_classes_view ON community_classes FOR SELECT
    USING (status = 'published');

-- Mentors can manage their own classes
CREATE POLICY community_classes_mentor ON community_classes FOR ALL
    USING (
        mentor_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- CLASS ENROLLMENTS POLICIES
-- =====================================================

CREATE POLICY class_enrollments_own ON class_enrollments FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- PAYMENTS POLICIES
-- =====================================================

CREATE POLICY payments_own ON payments FOR SELECT
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- SUBSCRIPTIONS POLICIES
-- =====================================================

CREATE POLICY subscriptions_own ON subscriptions FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- BOOKMARKS POLICIES
-- =====================================================

CREATE POLICY bookmarks_own ON bookmarks FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- USER CONNECTIONS POLICIES
-- =====================================================

CREATE POLICY connections_own ON user_connections FOR ALL
    USING (
        follower_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
        OR following_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- SKILL ASSESSMENTS POLICIES
-- =====================================================

CREATE POLICY skill_assessments_own ON skill_assessments FOR ALL
    USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- =====================================================
-- ANALYTICS EVENTS POLICIES (Insert only for own events)
-- =====================================================

CREATE POLICY analytics_insert ON analytics_events FOR INSERT
    WITH CHECK (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
        OR user_id IS NULL
    );

CREATE POLICY analytics_admin ON analytics_events FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users u 
            WHERE u.auth_id = auth.uid() AND u.role = 'admin'
        )
    );

-- =====================================================
-- REALTIME SUBSCRIPTIONS
-- =====================================================

-- Enable realtime for specific tables
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_room_members;
ALTER PUBLICATION supabase_realtime ADD TABLE user_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE community_classes;
ALTER PUBLICATION supabase_realtime ADD TABLE users;

-- =====================================================
-- SEED DATA: Initial achievements
-- =====================================================

INSERT INTO achievements (name, description, requirement_type, requirement_value, xp_reward, points_reward, rarity, icon_name, icon_color)
VALUES
    ('First Steps', 'Complete your first lesson', 'lessons_completed', 1, 50, 10, 'common', 'footsteps', '#10B981'),
    ('Fast Learner', 'Complete 3 lessons in a day', 'daily_lessons', 3, 100, 25, 'common', 'flash', '#F59E0B'),
    ('Week Warrior', 'Maintain a 7-day streak', 'streak', 7, 200, 50, 'rare', 'flame', '#EF4444'),
    ('Month Master', 'Maintain a 30-day streak', 'streak', 30, 500, 150, 'epic', 'trophy', '#6366F1'),
    ('Quiz Champion', 'Score 100% on 5 quizzes', 'perfect_quizzes', 5, 300, 75, 'rare', 'school', '#3B82F6'),
    ('Knowledge Seeker', 'Complete 10 lessons', 'lessons_completed', 10, 150, 40, 'common', 'book', '#10B981'),
    ('Dedicated Scholar', 'Complete 50 lessons', 'lessons_completed', 50, 400, 100, 'rare', 'library', '#8B5CF6'),
    ('Path Finder', 'Complete your first learning path', 'paths_completed', 1, 500, 150, 'rare', 'map', '#EC4899'),
    ('Social Butterfly', 'Connect with 10 other learners', 'connections', 10, 100, 30, 'common', 'people', '#14B8A6'),
    ('AI Explorer', 'Have 20 conversations with Mitra AI', 'ai_chats', 20, 150, 40, 'common', 'sparkles', '#6366F1');

-- =====================================================
-- SEED DATA: App config defaults
-- =====================================================

INSERT INTO app_config (key, value, description)
VALUES
    ('subscription_prices', '{"basic": {"monthly": 299, "yearly": 2999}, "premium": {"monthly": 599, "yearly": 5999}}', 'Subscription pricing in INR'),
    ('ai_settings', '{"model": "gemini-pro", "max_tokens": 1000, "temperature": 0.7}', 'AI configuration'),
    ('app_features', '{"chat_enabled": true, "payments_enabled": true, "community_enabled": true}', 'Feature flags'),
    ('maintenance_mode', '{"enabled": false, "message": "App is under maintenance"}', 'Maintenance mode settings');

-- =====================================================
-- END OF SCHEMA
-- =====================================================
