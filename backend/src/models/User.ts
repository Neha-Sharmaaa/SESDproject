import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  skills: Array<{ skillId: mongoose.Types.ObjectId; level: number }>;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    skills: [
      {
        skillId: { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
        level: { type: Number, required: true, min: 1, max: 10 },
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
