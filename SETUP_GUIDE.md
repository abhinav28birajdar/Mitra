# MitraApp Setup Guide

## 🚀 Quick Start

Your app is now connected to Supabase! Follow these steps IN ORDER to complete the setup:

### 1. Enable PostgreSQL Extensions

1. Go to Supabase SQL Editor: https://secvqmznbmmnjbtrfcjp.supabase.co/project/_/sql
2. Create a new query
3. Copy and paste the content of `supabase/00_setup.sql`
4. Click "Run"

### 2. Initialize Database Schema

1. In the same SQL Editor
2. Create a new query
3. Copy and paste the entire content of `supabase/schema.sql`
4. Click "Run" to execute the SQL
5. Wait for completion (this creates 70+ tables with RLS policies)

⚠️ **IMPORTANT**: The schema has been fixed to avoid reserved keyword errors:
- `current_role` → `user_current_role`
- All column names now match between schema and seed files

### 3. Initialize Database Functions

1. In the same SQL Editor
2. Create another new query
3. Copy and paste the entire content of `supabase/functions.sql`
4. Click "Run" to execute
5. This creates 25+ PostgreSQL functions for app features

### 4. Verify Setup (Optional but Recommended)

1. Create a new query
2. Copy and paste the content of `supabase/verify.sql`
3. Click "Run"
4. Check the results to ensure everything is set up correctly

### 5. Add Sample Data (Optional)

1. Create a new query
2. Copy and paste the content of `supabase/seed.sql`
3. Click "Run"

The seed file now includes:
- Sample industries
- Sample careers (with correct schema columns)
- Sample learning paths (with correct schema columns)
- Sample content posts (with correct schema columns)

### 3. Enable Real-time (Already Done ✅)

The following tables have real-time enabled:
- `messages` - For instant chat
- `notifications` - For live notifications
- `chats` - For chat updates
- `chat_members` - For member changes
- `classes` - For class updates
- `activity_feed` - For social feed
- `user_achievements` - For achievement notifications

### 4. Restart Expo Server

```powershell
# Stop current server (Ctrl+C in terminal)

# Clear cache and restart
npx expo start --clear
```

### 5. Test the App

1. Launch the app on your device/emulator
2. Try signing up with email
3. Check that real-time notifications work
4. Test authentication flow

## 🔑 Configuration Files

### Environment Variables (.env)
```
EXPO_PUBLIC_SUPABASE_URL=https://secvqmznbmmnjbtrfcjp.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

### App Config (app.json)
```json
{
  "extra": {
    "supabaseUrl": "https://secvqmznbmmnjbtrfcjp.supabase.co",
    "supabaseAnonKey": "eyJhbGci..."
  }
}
```

## 📋 Features Implemented

### Authentication
- ✅ Email/Password Registration
- ✅ Phone Number Registration
- ✅ OAuth (Google, Apple, Facebook)
- ✅ OTP Verification
- ✅ Email Verification
- ✅ Biometric Authentication
- ✅ Magic Link Login
- ✅ Password Reset

### Learning Management
- ✅ Course Enrollment & Progress
- ✅ Video Lessons with Watch Time Tracking
- ✅ Quizzes & Assessments
- ✅ Learning Paths
- ✅ Certificates
- ✅ Module Completion

### Analytics & Tracking
- ✅ Learning Time Tracking
- ✅ Course Completion Rate
- ✅ Quiz Performance
- ✅ Video Watch Time
- ✅ Engagement Metrics
- ✅ Weekly Activity Charts
- ✅ Skill Proficiency Radar Charts
- ✅ Learning Heatmap

### Gamification
- ✅ Daily Streak Counter
- ✅ Streak Freeze (miss days without losing streak)
- ✅ XP System
- ✅ Level Progression
- ✅ Leaderboards (Global, Friends, Class)
- ✅ Achievement Badges
- ✅ Challenges (Daily, Weekly, Special)
- ✅ Reward Store

### Social Features
- ✅ Friend System (Add, Remove, Block)
- ✅ Study Groups
- ✅ Activity Feed
- ✅ Share Progress
- ✅ Kudos System
- ✅ Real-time Chat

### Notifications
- ✅ Push Notifications (Expo)
- ✅ In-app Notifications
- ✅ Email/SMS Notifications
- ✅ Scheduled Reminders
- ✅ Smart Learning Reminders
- ✅ Real-time Notification Badge

### Search & Discovery
- ✅ Global Search (Courses, Users, Groups)
- ✅ Advanced Filters
- ✅ Search History
- ✅ Recently Viewed
- ✅ Trending Content
- ✅ AI Recommendations

### Skill Tracking
- ✅ User Skills with Proficiency Levels
- ✅ Skill Endorsements
- ✅ Skill Assessments
- ✅ Skill Gap Analysis
- ✅ Skill Recommendations
- ✅ Progress Tracking

### Payment & Monetization
- ✅ Course Purchases
- ✅ Subscriptions
- ✅ Payment History
- ✅ Wallet System

## 🔐 Security

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ User data isolated by user_id
- ✅ Secure authentication with JWT
- ✅ Role-based access control
- ✅ API key rotation support

## 📊 Database Schema

70+ Tables including:
- User Management (profiles, settings, onboarding)
- Learning (courses, lessons, progress, certificates)
- Gamification (XP, achievements, leaderboards, streaks)
- Social (friends, groups, activity_feed, chat)
- Analytics (learning_time, video_watch_time, heatmaps)
- Skills (user_skills, endorsements, assessments)
- Payments (transactions, subscriptions, wallets)
- Notifications (push tokens, preferences, history)

## 🛠️ Troubleshooting

### "relation 'public.careers' does not exist"
**Solution**: Run the SQL files in the correct order:
1. First: `00_setup.sql` (enable extensions)
2. Second: `schema.sql` (create tables)
3. Third: `functions.sql` (create functions)
4. Fourth: `seed.sql` (add sample data)

### "syntax error at or near 'current_role'"
**Solution**: ✅ FIXED! The schema has been updated:
- Changed `current_role` to `user_current_role` (avoided PostgreSQL reserved keyword)
- Updated profileService.ts to match

### "column does not exist" in seed.sql
**Solution**: ✅ FIXED! The seed file has been updated:
- Careers table now uses correct columns: `salary_min`, `salary_max`, `growth_rate`, etc.
- Learning paths now use: `image_url`, `difficulty`, `duration_hours`, etc.
- Content posts now use: `status`, `published_at`, `excerpt`, etc.

### "Database not initialized" error in app
- Run `schema.sql` in Supabase SQL Editor
- Then run `functions.sql`
- Restart the app

### "Runtime not ready" error
- Clear Expo cache: `npx expo start --clear`
- Check .env file has correct credentials
- Verify app.json has supabase config

### Real-time not working
- Check Supabase dashboard for real-time status
- Ensure tables have real-time enabled
- Verify API limits not exceeded

### Authentication failing
- Check Supabase Auth settings
- Enable email/password provider
- Configure OAuth providers (Google, Apple, Facebook)
- Set up redirect URLs for OAuth

## 📱 Running the App

### Development
```powershell
# Install dependencies (if not done)
npm install

# Start Expo server
npx expo start

# Run on Android
npx expo run:android

# Run on iOS
npx expo run:ios

# Run on Web
npx expo start --web
```

### Production Build
```powershell
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 🔗 Important Links

- Supabase Dashboard: https://secvqmznbmmnjbtrfcjp.supabase.co
- SQL Editor: https://secvqmznbmmnjbtrfcjp.supabase.co/project/_/sql
- Authentication: https://secvqmznbmmnjbtrfcjp.supabase.co/project/_/auth/users
- Database: https://secvqmznbmmnjbtrfcjp.supabase.co/project/_/database/tables
- Real-time: https://secvqmznbmmnjbtrfcjp.supabase.co/project/_/database/replication

## 📝 Next Steps

1. ✅ Database initialized
2. ✅ Real-time configured
3. ✅ All services implemented
4. 🔄 Test authentication flow
5. 🔄 Test real-time features
6. 🔄 Configure OAuth providers
7. 🔄 Set up push notifications
8. 🔄 Deploy to production

## 🆘 Need Help?

Check the error messages in the app - they will guide you through setup!

The app now includes:
- Automatic database connection check
- Clear error messages
- Setup instructions
- Real-time status monitoring
