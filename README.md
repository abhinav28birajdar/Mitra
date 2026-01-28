# Mitra AI - Intelligent Career & Learning Ecosystem

<p align="center">
  <img src="./assets/icon.jpg" alt="Mitra AI Logo" width="120px">
</p>

## 🚀 Status: Active Development
**Mitra AI** is a production-grade ed-tech platform built with **React Native (Expo)** and **Appwrite**. We are actively migrating from a high-fidelity prototype to a robust, serverless architecture to power personalized AI career coaching and real-time learning tracking.

## 🛠️ Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white" alt="Appwrite" />
  <img src="https://img.shields.io/badge/NativeWind-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="NativeWind" />
  <img src="https://img.shields.io/badge/Reanimated-FF5722?style=for-the-badge&logo=framer&logoColor=white" alt="Reanimated" />
</p>

* **Frontend:** React Native with Expo (Managed Workflow)
* **Language:** TypeScript
* **Navigation:** React Navigation v6 (Deep Linking & Nested Stacks)
* **Backend/Database:** Appwrite (Database, Auth, Storage)
* **Authentication:** Appwrite Account API (Email/OTP & OAuth)
* **Styling:** NativeWind (Tailwind CSS) & HSL Color Spaces
* **Animations:** React Native Reanimated / Skia

---

## ⚙️ Core Functions & Modules

### 🧠 The AI Engine (Career Coach)
* **Smart Personalization:**
    * **Multi-step Onboarding:** Algorithmic mapping of user goals, current skills, and interests.
    * **Dynamic Dashboard:** Context-aware greeting and daily recommendation cards based on progress.
* **Intelligent Interaction:**
    * **AI Chat Interface:** Sophisticated chat UI for the "Mitra" career companion (Transitioning to API-driven).
    * **Goal Tracking:** Real-time monitoring of career milestones and skill acquisition.

### 🎓 Learning Management System (LMS)
* **Course Architecture:**
    * **Hierarchical Structure:** Organized flow of `Tracks` → `Modules` → `Lessons` → `Quizzes`.
    * **Custom Video Player:** Optimized playback controls for course content.
* **Assessment & Validation:**
    * **Interactive Quizzes:** Immediate feedback loops (Correct/Incorrect states) with score calculation.
    * **Certificate Generation:** Digital badge issuance stored via Appwrite Buckets.

### 📊 Analytics & Gamification (User Growth)
* **Visual Progress:**
    * **Weekly Activity Charts:** Data visualization using `react-native-chart-kit`.
    * **Skill Proficiency:** Radar charts to visualize strength areas.
* **Engagement Loops:**
    * **Streak Logic:** Tracks consecutive learning days to build habit.
    * **Visual OTP:** A highly polished, interactive screen for secure authentication verification.

---

## 🎯 Next Goals (Roadmap)
- [ ] **AI Integration:** Connect Chat Interface to OpenAI/Gemini API via Appwrite Functions.
- [ ] **Resume Parser:** Implement file upload to parse PDF resumes for auto-profiling.
- [ ] **Offline Mode:** Implement `RxDB` or `WatermelonDB` for offline lesson access.
- [ ] **Payment Gateway:** Integrate Stripe for Premium Course access.

---

### 📂 View Latest Progress
This branch focuses on the implementation of backend logic, Appwrite integration, and real-time functional components. To view the stable version or contribute:

👉 **Check the [Main Branch](https://github.com/your-username/mitra-ai/tree/main)**