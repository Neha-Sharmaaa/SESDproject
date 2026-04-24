import mongoose, { Schema, Document } from 'mongoose';

export interface ICareerRole extends Document {
  name: string;
  description: string;
  requiredSkills: Array<{
    skillId: mongoose.Types.ObjectId;
    requiredLevel: number;
  }>;
}

const CareerRoleSchema = new Schema<ICareerRole>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  requiredSkills: [
    {
      skillId: { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
      requiredLevel: { type: Number, required: true, min: 1, max: 10 },
    },
  ],
});

export const CareerRoleModel = mongoose.model<ICareerRole>('CareerRole', CareerRoleSchema);
