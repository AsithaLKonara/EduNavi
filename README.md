# EduNavi - Your Direction. Your Education. Your Future.

EduNavi is a smart education navigator for Sri Lanka, designed to guide every learner to the right courses, skills, and opportunities for a better tomorrow.

## 🏗️ Project Structure

- `backend/`: NestJS API Gateway and services.
- `mobile/`: React Native (Expo) mobile application.

## 🚀 Technology Stack

- **Mobile**: React Native (Expo), Zustand, React Query, NativeWind.
- **Backend**: Node.js (NestJS).
- **Database**: PostgreSQL + Prisma + Supabase.
- **AI**: Groq API.
- **Scraping**: Playwright + Cron.

## 📜 Quick Start Guide

### 1. Running the Backend (NestJS API)
The backend manages the database connections and our custom scraping logic.

Open a new terminal window:
```bash
cd backend
npm install
npm run start:dev
```
*The backend will run on `http://localhost:3000`.*

### 2. Running the Mobile App (Expo)
The mobile app is built with Expo and NativeWind.

Open a second terminal window:
```bash
cd mobile
npm install
npm run web      # To run in the browser (Recommended for quick testing)
# OR
npx expo start   # To scan the QR code with the Expo Go app on your physical device
```
*The web version will usually run on `http://localhost:8081`.*

### 🔐 Demo Credentials
A pre-registered, fully verified demo account has been seeded into the database for immediate testing:

* **Email**: `demo@edunavi.com`
* **Password**: `demo1234Password!`

To test the application:
1. Open the app (Web or Mobile).
2. Enter the demo email and password above on the **Auth Screen**.
3. Click the **"Sign In"** button to immediately access the course discovery system!
