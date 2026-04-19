export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'admin';
    created_at?: string;
}

export interface Skill {
    id?: number;
    name: string;
    category: string;
}

export interface UserSkill {
    id?: number;
    user_id: number;
    skill_id: number;
    level: number; // 1-10
}

export interface CareerRole {
    id?: number;
    name: string;
    description: string;
}

export interface CareerRequiredSkill {
    id?: number;
    career_id: number;
    skill_id: number;
    required_level: number;
}

export interface Roadmap {
    id?: number;
    career_id: number;
    steps: string; // JSON string
}
