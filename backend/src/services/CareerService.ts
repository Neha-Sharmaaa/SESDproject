import { CareerRepository } from '../repositories/CareerRepository';
import { SkillRepository } from '../repositories/SkillRepository';
import { CareerRole } from '../models/types';

// Strategy Pattern for Recommendations
interface RecommendationStrategy {
    calculate(userSkills: any[], careerSkills: any[]): number;
}

class SimpleMatchStrategy implements RecommendationStrategy {
    calculate(userSkills: any[], careerSkills: any[]): number {
        if (careerSkills.length === 0) return 0;
        let totalScore = 0;
        careerSkills.forEach(cs => {
            const us = userSkills.find(u => u.id === cs.skill_id);
            if (us) {
                // Calculation: (User Level / Required Level) capped at 1
                const match = Math.min(us.level / cs.required_level, 1);
                totalScore += match;
            }
        });
        return Math.round((totalScore / careerSkills.length) * 100);
    }
}

export class CareerService {
    private static instance: CareerService;
    private careerRepo: CareerRepository;
    private skillRepo: SkillRepository;
    private strategy: RecommendationStrategy;

    private constructor() {
        this.careerRepo = new CareerRepository();
        this.skillRepo = new SkillRepository();
        this.strategy = new SimpleMatchStrategy(); // Can be swapped for different strategy
    }

    public static getInstance(): CareerService {
        if (!CareerService.instance) {
            CareerService.instance = new CareerService();
        }
        return CareerService.instance;
    }

    async getRecommendations(userId: number) {
        const userSkills = await this.skillRepo.findUserSkills(userId);
        const careers = await this.careerRepo.findAll();
        
        const recommendations = await Promise.all(careers.map(async (career) => {
            const careerSkills = await this.careerRepo.getRequiredSkills(career.id!);
            const score = this.strategy.calculate(userSkills, careerSkills);
            
            const skillGaps = careerSkills
                .filter(cs => {
                    const us = userSkills.find(u => u.id === cs.skill_id);
                    return !us || us.level < cs.required_level;
                })
                .map(cs => ({
                    skill: cs.name,
                    required: cs.required_level,
                    current: userSkills.find(u => u.id === cs.skill_id)?.level || 0
                }));

            return {
                ...career,
                matchPercentage: score,
                skillGaps
            };
        }));

        return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
    }

    async getRoadmap(careerId: number, userId: number) {
        const career = await this.careerRepo.findById(careerId);
        if (!career) throw new Error('Career not found');

        const userSkills = await this.skillRepo.findUserSkills(userId);
        const careerSkills = await this.careerRepo.getRequiredSkills(careerId);
        
        const missingSkills = careerSkills.filter(cs => {
            const us = userSkills.find(u => u.id === cs.skill_id);
            return !us || us.level < cs.required_level;
        });

        // Simple roadmap generation logic
        const steps = missingSkills.map((ms, index) => ({
            step: index + 1,
            title: `Learn ${ms.name}`,
            description: `Reach level ${ms.required_level} in ${ms.name}. Focus on basic to advanced concepts.`,
            resources: [`Documentation for ${ms.name}`, `Online course for ${ms.name}`]
        }));

        return {
            career: career.name,
            steps
        };
    }
}
