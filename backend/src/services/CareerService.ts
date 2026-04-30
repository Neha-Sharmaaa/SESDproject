import { CareerRepository } from '../repositories/CareerRepository';
import { SkillRepository, UserSkillItem } from '../repositories/SkillRepository';
import { CareerSkillItem } from '../repositories/CareerRepository';

// Strategy Pattern for Recommendations
interface RecommendationStrategy {
  calculate(userSkills: UserSkillItem[], careerSkills: CareerSkillItem[]): number;
}

class SimpleMatchStrategy implements RecommendationStrategy {
  calculate(userSkills: UserSkillItem[], careerSkills: CareerSkillItem[]): number {
    if (careerSkills.length === 0) return 0;
    let totalScore = 0;
    careerSkills.forEach((cs) => {
      const us = userSkills.find((u) => u.id === cs.skillId);
      if (us) {
        const match = Math.min(us.level / cs.requiredLevel, 1);
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
    this.strategy = new SimpleMatchStrategy();
  }

  public static getInstance(): CareerService {
    if (!CareerService.instance) {
      CareerService.instance = new CareerService();
    }
    return CareerService.instance;
  }

  async getRecommendations(userId: string) {
    const userSkills = await this.skillRepo.findUserSkills(userId);
    const careers = await this.careerRepo.findAll();

    const recommendations = await Promise.all(
      careers.map(async (career) => {
        const careerId = career._id.toString();
        const careerSkills = await this.careerRepo.getRequiredSkills(careerId);
        const score = this.strategy.calculate(userSkills, careerSkills);

        const skillGaps = careerSkills
          .filter((cs) => {
            const us = userSkills.find((u) => u.id === cs.skillId);
            return !us || us.level < cs.requiredLevel;
          })
          .map((cs) => ({
            skill: cs.name,
            required: cs.requiredLevel,
            current: userSkills.find((u) => u.id === cs.skillId)?.level || 0,
          }));

        return {
          id: careerId,
          name: career.name,
          description: career.description,
          matchPercentage: score,
          skillGaps,
        };
      })
    );

    return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  async getRoadmap(careerId: string, userId: string) {
    const career = await this.careerRepo.findById(careerId);
    if (!career) throw new Error('Career not found');

    const userSkills = await this.skillRepo.findUserSkills(userId);
    const careerSkills = await this.careerRepo.getRequiredSkills(careerId);

    const missingSkills = careerSkills.filter((cs) => {
      const us = userSkills.find((u) => u.id === cs.skillId);
      return !us || us.level < cs.requiredLevel;
    });

    const steps = missingSkills.map((ms, index) => ({
      step: index + 1,
      title: `Learn ${ms.name}`,
      description: `Reach level ${ms.requiredLevel} in ${ms.name}. Focus on basic to advanced concepts.`,
      resources: [`Documentation for ${ms.name}`, `Online course for ${ms.name}`],
    }));

    return { career: career.name, steps };
  }
}
