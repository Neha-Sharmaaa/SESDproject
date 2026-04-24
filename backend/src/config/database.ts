import mongoose from 'mongoose';
import { SkillModel } from '../models/Skill';
import { CareerRoleModel } from '../models/CareerRole';

async function seedDatabase() {
  const skillCount = await SkillModel.countDocuments();
  if (skillCount > 0) return; // Already seeded

  const skills = await SkillModel.insertMany([
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'TypeScript', category: 'Backend' },
    { name: 'Python', category: 'Data Science' },
    { name: 'Machine Learning', category: 'Data Science' },
    { name: 'SQL', category: 'Database' },
  ]);

  const skillMap: Record<string, mongoose.Types.ObjectId> = {};
  skills.forEach((s) => {
    skillMap[s.name] = s._id as mongoose.Types.ObjectId;
  });

  await CareerRoleModel.insertMany([
    {
      name: 'Full Stack Developer',
      description: 'Expert in both frontend and backend technologies.',
      requiredSkills: [
        { skillId: skillMap['JavaScript'], requiredLevel: 8 },
        { skillId: skillMap['React'], requiredLevel: 8 },
        { skillId: skillMap['Node.js'], requiredLevel: 8 },
        { skillId: skillMap['SQL'], requiredLevel: 7 },
      ],
    },
    {
      name: 'Frontend Developer',
      description: 'Focuses on user interface and user experience.',
      requiredSkills: [
        { skillId: skillMap['JavaScript'], requiredLevel: 9 },
        { skillId: skillMap['React'], requiredLevel: 9 },
        { skillId: skillMap['TypeScript'], requiredLevel: 7 },
      ],
    },
    {
      name: 'Backend Developer',
      description: 'Focuses on server-side logic and database.',
      requiredSkills: [
        { skillId: skillMap['Node.js'], requiredLevel: 9 },
        { skillId: skillMap['TypeScript'], requiredLevel: 8 },
        { skillId: skillMap['SQL'], requiredLevel: 8 },
      ],
    },
    {
      name: 'Data Scientist',
      description: 'Analyzes and interprets complex data.',
      requiredSkills: [
        { skillId: skillMap['Python'], requiredLevel: 9 },
        { skillId: skillMap['Machine Learning'], requiredLevel: 8 },
        { skillId: skillMap['SQL'], requiredLevel: 7 },
      ],
    },
  ]);

  console.log('Database seeded successfully');
}

export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI environment variable is not defined');

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  await seedDatabase();
}
