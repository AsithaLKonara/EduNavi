EduNavi - System Architecture Design

I’ll structure this into:

1. 🏗️ System architecture
2. 🗄️ Database choice (important decision)
3. 📚 Course data pipeline (government + private + global + gazette)
4. 🔌 API integrations (affiliate + scraping + AI)
5. 📱 Mobile app architecture (React Native)
6. ⚙️ Backend services design
7. 💰 Monetization system (clean + scalable)
8. 🚀 MVP → Scale roadmap

---

# 🏗️ 1. SYSTEM ARCHITECTURE (FULL VIEW)

```text
                ┌──────────────────────┐
                │  React Native App    │
                │  (iOS + Android)     │
                └─────────┬────────────┘
                          │
                          ▼
                ┌──────────────────────┐
                │   API Gateway        │
                │ Node.js (NestJS)     │
                └─────────┬────────────┘
                          │
     ┌────────────────────┼────────────────────┐
     ▼                    ▼                    ▼
Course Service     AI Matching Service   Monetization Service
     │                    │                    │
     ▼                    ▼                    ▼
MongoDB/Postgres     Groq API          Affiliate APIs / Ads

     ▼
Data Ingestion System (Scraping + APIs + Admin uploads)
```

---

# 🗄️ 2. DATABASE DECISION (VERY IMPORTANT)

You asked:

> Prisma + MongoDB Atlas OR Prisma + PostgreSQL (Supabase)

## 🔥 FINAL RECOMMENDATION:

👉 **Use: PostgreSQL + Prisma + Supabase**

---

## Why NOT MongoDB here?

MongoDB is good for flexible data, BUT:

* ❌ weak relational integrity (courses ↔ institutes ↔ categories)
* ❌ harder analytics (important for monetization)
* ❌ harder ranking queries
* ❌ harder affiliate tracking

---

## Why PostgreSQL wins:

✔ perfect for structured course data
✔ strong relationships
✔ easier analytics (what makes money)
✔ Supabase gives:

* auth
* storage
* edge functions
* dashboard

---

## FINAL STACK:

> 🧠 Prisma + PostgreSQL (Supabase)

---

# 📚 3. COURSE DATA SYSTEM (CORE OF PRODUCT)

This is your most important system.

## You need 4 data sources:

---

## 🇱🇰 A. Government Courses

### Sources:

* University Grants Commission (UGC Sri Lanka)
* Ministry of Education
* Gazette notifications (important)
* Vocational training authority (VTA)
* Open university listings

### How to get:

* scraping (scheduled jobs)
* PDF parsing (gazettes)
* manual admin verification

---

## 🏫 B. Private Institutes

Examples:

* SLIIT
* NSBM
* ESOFT
* IDM
* private colleges

### Method:

* Admin submission system (PRIMARY)
* scraping (fallback)

---

## 🌍 C. Global Courses

### APIs:

* Udemy Affiliate API
* Coursera partner feeds (if approved)
* edX public dataset (limited)
* YouTube Learning APIs (optional enrichment)

---

## 📄 D. Gazette System (IMPORTANT UNIQUE FEATURE)

Sri Lanka gazettes contain:

* government job training
* diploma programs
* skill programs
* vocational courses

### Pipeline:

```text
PDF Gazette → OCR → Extract course data → AI structuring → DB
```

This is a **strong competitive advantage** no one is doing properly.

---

# 🔌 4. API INTEGRATION DESIGN

---

## 🧠 AI (Groq)

Used for:

* matching user → courses
* ranking
* explanation
* career paths

---

## 🔗 Affiliate APIs

### Udemy Affiliate

* track clicks
* earn commission

### Amazon Learning books (optional)

* books + certifications

### Coursera (if possible)

* referral links

---

## 🧾 Scraping System

Use:

* Puppeteer / Playwright (Node.js)
* cron jobs
* queue system (BullMQ)

---

## ⚠️ IMPORTANT RULE:

Never scrape aggressively → use:

* rate limits
* caching
* fallback manual input

---

# 📱 5. MOBILE APP (REACT NATIVE)

## Stack:

* React Native (Expo)
* Zustand (state)
* React Query (API cache)
* NativeWind (UI)

---

## Screens:

### USER SIDE

1. Onboarding
2. Profile builder
3. AI recommendation feed
4. Course detail page
5. Career roadmap view
6. Saved courses

---

### ADMIN SIDE (WEB)

* course approval
* institute management
* analytics dashboard
* scraping logs

---

# ⚙️ 6. BACKEND SERVICES

Use **modular architecture**

---

## Services:

### 1. User Service

* auth
* profile
* preferences

---

### 2. Course Service

* CRUD courses
* search
* filters

---

### 3. AI Service

* Groq integration
* ranking engine
* career mapping

---

### 4. Scraper Service

* government sites
* institutes
* PDFs

---

### 5. Monetization Service

* affiliate tracking
* clicks
* lead generation

---

# 💰 7. MONETIZATION MODEL (CLEAN + ETHICAL)

You MUST avoid ads. So this is best:

---

## 🥇 1. Affiliate Revenue

* Udemy / Coursera links
* earn per conversion

---

## 🥈 2. Lead Generation

Institutes pay for:

* student inquiries
* application clicks

💰 $0.5 – $3 per lead

---

## 🥉 3. Featured Listings

Institutes pay:

* $20 – $200/month

BUT shown subtly:

> “Verified / Recommended”

---

## 🎁 4. Donations

* diaspora support
* “support education in Sri Lanka”

---

# 📊 8. PRISMA DATA MODEL (SIMPLIFIED)

Key tables:

### Users

* id
* age
* education
* skills
* interests

---

### Courses

* id
* title
* provider
* type (gov/private/global)
* category
* price
* url
* verified

---

### Institutes

* id
* name
* type
* verified
* contact

---

### Applications / Leads

* userId
* courseId
* instituteId
* status

---

### AffiliateClicks

* userId
* courseId
* source
* revenueTrackingId

---

### GazetteCourses

* pdfSource
* extractedData
* verifiedStatus

---

# 🚀 9. MVP ROADMAP (REALISTIC)

## Phase 1 (2–3 weeks)

* React Native app
* user profile
* manual course DB
* basic AI matching

---

## Phase 2

* admin panel
* institute submission
* affiliate links

---

## Phase 3

* scraping system
* gazette parser
* AI career engine v2

---

## Phase 4 (scale)

* monetization system
* analytics
* personalization engine

---

# 🧠 10. KEY STRATEGIC INSIGHT

Your real power is NOT AI.

It is:

> 📌 “Aggregated Sri Lankan education intelligence system”

Because:

* no one unified gov + private + global courses
* no AI career mapping in local context
* no gazette integration anywhere

---

# ⚡ FINAL STACK SUMMARY

* Mobile: React Native (Expo)
* Backend: Node.js (NestJS)
* DB: PostgreSQL + Prisma + Supabase
* AI: Groq API
* Scraping: Playwright + cron
* Hosting: Supabase + Render / Railway

logo concept is in this image : logoconcept.png

---

git remote add origin https://github.com/AsithaLKonara/EduNavi.git
git branch -M main
git push -u origin main