import { SkillRepository } from '../repositories/SkillRepository';

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

  async getAllSkills() {
    return await this.skillRepo.findAll();
  }

  async getUserSkills(userId: string) {
    return await this.skillRepo.findUserSkills(userId);
  }

  async updateUserSkill(userId: string, skillId: string, level: number) {
    if (level < 1 || level > 10) throw new Error('Level must be between 1 and 10');
    await this.skillRepo.addUserSkill(userId, skillId, level);
  }

  async deleteUserSkill(userId: string, skillId: string) {
    await this.skillRepo.removeUserSkill(userId, skillId);
  }
}
