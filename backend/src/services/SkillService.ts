import { SkillRepository } from '../repositories/SkillRepository';
import { Skill } from '../models/types';

export class SkillService {
    private static instance: SkillService;
    private skillRepo: SkillRepository;

    private constructor() {
        this.skillRepo = new SkillRepository();
    }

    public static getInstance(): SkillService {
        if (!SkillService.instance) {
            SkillService.instance = new SkillService();
        }
        return SkillService.instance;
    }

    async getAllSkills(): Promise<Skill[]> {
        return await this.skillRepo.findAll();
    }

    async getUserSkills(userId: number) {
        return await this.skillRepo.findUserSkills(userId);
    }

    async updateUserSkill(userId: number, skillId: number, level: number) {
        if (level < 1 || level > 10) throw new Error('Level must be between 1 and 10');
        await this.skillRepo.addUserSkill(userId, skillId, level);
    }
}
