# SkillGraph – AI-Based Skill Mapping & Career Recommendation System

SkillGraph is a comprehensive Full Stack application designed to help students and professionals map their skills to career roles and generate personalized learning roadmaps.

## 🚀 Features

- **JWT Authentication**: Secure user registration and login.
- **Skill Management**: Track and update proficiency levels (1-10) for various technologies.
- **Career Recommendation Engine**: Uses a **Strategy Pattern** to calculate match percentages between user skills and career requirements.
- **Skill Gap Analysis**: Identifies missing skills and proficiency gaps for target roles.
- **Dynamic Roadmaps**: Generates step-by-step learning paths with recommended resources.
- **Clean Architecture**: Backend follows Controller-Service-Repository pattern with strong OOP principles.

## 🛡 Tech Stack

- **Backend**: Node.js, Express, TypeScript, SQLite
- **Frontend**: React, Vite, TypeScript, Lucide-React, Axios
- **Database**: SQLite (SQL-based relational schema)
- **Documentation**: Mermaid diagrams for Architecture and Design

## 🛠 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (optional, defaults are provided):
   ```env
   PORT=5001
   JWT_SECRET=your_secret_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```text
SESDproject/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic (Singletons, Strategies)
│   │   ├── repositories/  # Data Access Layer (Inheritance)
│   │   ├── models/        # Interfaces & Types
│   │   ├── middleware/    # Auth & Validation
│   │   └── config/        # DB & Env config
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.tsx
├── idea.md                # Project concept
├── useCaseDiagram.md      # System interactions
├── classDiagram.md        # OOP structure
├── sequenceDiagram.md     # Use case flow
└── ErDiagram.md           # DB schema
```

## 🏗 OOP Principles Applied

1. **Encapsulation**: Services and Repositories encapsulate data access and business logic.
2. **Inheritance**: `UserRepository`, `SkillRepository`, etc., inherit from `BaseRepository`.
3. **Polymorphism**: `RecommendationStrategy` interface allows swapping different match calculation algorithms.
4. **Abstraction**: Use of interfaces for models and abstract classes for repositories.

## 🛣 API Endpoints

- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/skills` - Get all available skills
- `GET /api/skills/me` - Get current user's skills
- `POST /api/skills/me` - Update user's skill level
- `GET /api/careers/recommendations` - Get matched careers
- `GET /api/careers/roadmap/:careerId` - Get learning roadmap