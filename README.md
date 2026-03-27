# Mitra AI - Intelligent Career & Learning Ecosystem

<p align="center">
  <img src="/assets/images/icon.png" alt="Mitra AI Logo" width="120px">
</p>

## 🎥 Mitra AI Demo
https://github.com/user-attachments/assets/a9ae4479-e8bf-4503-9cb1-bf892c3e18fe 
---

## 🚀 Status: Active Development
**Mitra AI** is a production-grade ed-tech platform built with **React Native (Expo)** and **Appwrite**. We are actively migrating from a high-fidelity prototype to a robust, serverless architecture to power personalized AI career coaching and real-time learning tracking.

---

## 🛠️ Tech Stack
<p align="left">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white" alt="Appwrite" />
  <img src="https://img.shields.io/badge/NativeWind-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="NativeWind" />
  <img src="https://img.shields.io/badge/Reanimated-FF5722?style=for-the-badge&logo=framer&logoColor=white" alt="Reanimated" />
</p>

- **Frontend:** React Native with Expo (Managed Workflow)  
- **Language:** TypeScript  
- **Navigation:** React Navigation v6 (Deep Linking & Nested Stacks)  
- **Backend/Database:** Appwrite (Database, Auth, Storage)  
- **Authentication:** Appwrite Account API (Email/OTP & OAuth)  
- **Styling:** NativeWind (Tailwind CSS) & HSL Color Spaces  
- **Animations:** React Native Reanimated / Skia  

---

## ⚙️ Core Functions & Modules

### 🧠 The AI Engine (Career Coach)
- **Smart Personalization:**  
  - Multi-step onboarding to map user goals, current skills, and interests  
  - Dynamic dashboard with context-aware greetings and daily recommendations
- **Intelligent Interaction:**  
  - AI Chat interface for the “Mitra” career companion (API-driven)  
  - Goal tracking with real-time monitoring of career milestones

### 🎓 Learning Management System (LMS)
- **Course Architecture:**  
  - Hierarchical structure: `Tracks → Modules → Lessons → Quizzes`  
  - Custom video player for course content
- **Assessment & Validation:**  
  - Interactive quizzes with immediate feedback and score calculation  
  - Certificate generation stored via Appwrite Buckets

### 📊 Analytics & Gamification
- **Visual Progress:**  
  - Weekly activity charts using `react-native-chart-kit`  
  - Radar charts for skill proficiency
- **Engagement Loops:**  
  - Streak logic to track consecutive learning days  
  - Visual OTP for secure authentication verification

---

## 🎯 Next Goals (Roadmap)
- [ ] AI Integration: Connect Chat interface to OpenAI/Gemini API via Appwrite Functions  
- [ ] Resume Parser: Implement PDF resume upload for auto-profiling  
- [ ] Offline Mode: Integrate `RxDB` or `WatermelonDB` for offline lesson access  
- [ ] Payment Gateway: Integrate Stripe for Premium course access  
