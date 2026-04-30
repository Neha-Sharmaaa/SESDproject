import { CareerRoleModel, ICareerRole } from '../models/CareerRole';
import { ISkill } from '../models/Skill';

export interface CareerSkillItem {
  skillId: string;
  name: string;
  requiredLevel: number;
}

export class CareerRepository {
  async findAll(): Promise<ICareerRole[]> {
    return CareerRoleModel.find().exec();
  }

  async findById(id: string): Promise<ICareerRole | null> {
    return CareerRoleModel.findById(id).exec();
  }

  async getRequiredSkills(careerId: string): Promise<CareerSkillItem[]> {
    const career = await CareerRoleModel.findById(careerId)
      .populate<{
        requiredSkills: Array<{ skillId: ISkill; requiredLevel: number }>;
      }>('requiredSkills.skillId')
      .exec();

    if (!career) return [];

    return career.requiredSkills
      .filter((rs) => rs.skillId !== null)
      .map((rs) => ({
        skillId: (rs.skillId as ISkill)._id.toString(),
        name: (rs.skillId as ISkill).name,
        requiredLevel: rs.requiredLevel,
      }));
  }
}
