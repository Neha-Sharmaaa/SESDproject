SkillGraph – AI-Based Skill Mapping & Career Recommendation System
1. Problem Statement

Students often do not know:

What skills they currently have

What career paths match their skills

What skills they need to learn next

How to build a roadmap toward a specific role

There is no structured system that maps skills → career roles → learning roadmap.

2. Proposed Solution

SkillGraph is a Full Stack web application that:

Analyzes user skills

Matches them with suitable career roles

Recommends missing skills

Generates personalized learning roadmap

Tracks skill progress

3. Target Users

College Students

Freshers

Working Professionals

Career Switchers

4. Core Features (Backend Focused)
🔹 Authentication

User Signup

Login

JWT-based authentication

🔹 Skill Management

Add skill

Update skill level

Delete skill

Categorize skills

🔹 Career Recommendation Engine

Match skills with roles

Calculate skill match percentage

Suggest missing skills

🔹 Learning Roadmap Generator

Generate roadmap for selected career

Recommend courses/resources

🔹 Admin Panel

Add career roles

Add required skills for role

Manage skill categories

5. Tech Stack (Proposed)

Backend:

Node.js + Express (or Spring Boot / Django if preferred)

PostgreSQL / MySQL

JWT Authentication

Frontend:

React.js

6. Backend Architecture

Controller Layer

Service Layer

Repository Layer

DTOs

Middleware (Auth)

Proper error handling

Validation

7. OOP Principles Used

Encapsulation (Service layer)

Abstraction (Interfaces)

Inheritance (Base user class)

Polymorphism ((Recommendation strategies))