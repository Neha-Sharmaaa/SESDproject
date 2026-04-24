import mongoose from 'mongoose';
import { SkillModel, ISkill } from '../models/Skill';
import { UserModel } from '../models/User';

export interface UserSkillItem {
  _id: string;
  name: string;
  category: string;
  level: number;
}

export class SkillRepository {
  async findAll(): Promise<ISkill[]> {
    return SkillModel.find().exec();
  }

  async findById(id: string): Promise<ISkill | null> {
    return SkillModel.findById(id).exec();
  }

  async findUserSkills(userId: string): Promise<UserSkillItem[]> {
    const user = await UserModel.findById(userId)
      .populate<{ skills: Array<{ skillId: ISkill; level: number }> }>('skills.skillId')
      .exec();

    if (!user) return [];

    return user.skills.map((s) => {
      const skill = s.skillId as ISkill;
      return {
        _id: skill._id.toString(),
        name: skill.name,
        category: skill.category,
        level: s.level,
      };
    });
  }

  async addUserSkill(userId: string, skillId: string, level: number): Promise<void> {
    const user = await UserModel.findById(userId).exec();
    if (!user) throw new Error('User not found');

    const existing = user.skills.find((s) => s.skillId.toString() === skillId);
    if (existing) {
      existing.level = level;
    } else {
      user.skills.push({ skillId: new mongoose.Types.ObjectId(skillId), level });
    }
    await user.save();
  }

  async removeUserSkill(userId: string, skillId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, {
      $pull: { skills: { skillId: new mongoose.Types.ObjectId(skillId) } },
    }).exec();
  }
}
