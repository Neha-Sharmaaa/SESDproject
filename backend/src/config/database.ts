import mongoose from 'mongoose';
import { SkillModel } from '../models/Skill';
import { CareerRoleModel } from '../models/CareerRole';


export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI environment variable is not defined');

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

}
