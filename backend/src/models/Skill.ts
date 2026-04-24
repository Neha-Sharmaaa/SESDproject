import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
});

export const SkillModel = mongoose.model<ISkill>('Skill', SkillSchema);
