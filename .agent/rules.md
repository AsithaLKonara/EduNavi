# EduNavi - Development Rules

These rules are specific to the EduNavi project and MUST be followed by the AI assistant at all times.

## 📈 Real-Time Progress Tracking
- **Rule**: The AI assistant MUST update `PROGRESS.md` after every significant implementation step or completion of a task.
- **Goal**: Maintain an accurate, real-time checklist of the project status to ensure E2E visibility.
- **Format**: Use `[x]` for completed tasks and `[ ]` for pending ones. Add timestamps for major updates.

## 🧱 Architectural Integrity
- Follow the modular service pattern in the NestJS backend.
- Maintain NativeWind v4 styling conventions in the mobile app.
- Ensure all database changes are reflected in the Prisma schema before application.

## 🚀 Verification Standard
- Every change MUST be verified (build test, bundling test, or unit test) before being marked as complete in `PROGRESS.md`.
- Commits should be frequent and descriptive, following the conventional commits standard (e.g., `feat:`, `fix:`, `chore:`).
