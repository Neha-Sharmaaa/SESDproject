import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { SkillModel } from '../models/Skill';
import { CareerRoleModel } from '../models/CareerRole';

// Load environment variables
dotenv.config();

async function runSeed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI environment variable is not defined.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected.');

    // Optional: Clear existing data before seeding
    console.log('Clearing existing skills and career roles...');
    await SkillModel.deleteMany({});
    await CareerRoleModel.deleteMany({});

    console.log('Seeding Skills...');
    const skillsData = [
      { name: 'JavaScript', category: 'Frontend' },
      { name: 'TypeScript', category: 'Backend' },
      { name: 'React', category: 'Frontend' },
      { name: 'Vue.js', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Express.js', category: 'Backend' },
      { name: 'Python', category: 'Data Science' },
      { name: 'Machine Learning', category: 'Data Science' },
      { name: 'SQL', category: 'Database' },
      { name: 'MongoDB', category: 'Database' },
      { name: 'Docker', category: 'DevOps' },
      { name: 'AWS', category: 'DevOps' },
    ];
    
    const skills = await SkillModel.insertMany(skillsData);

    const skillMap: Record<string, mongoose.Types.ObjectId> = {};
    skills.forEach((s) => {
      skillMap[s.name] = s._id as mongoose.Types.ObjectId;
    });

    console.log('Seeding Career Roles...');
    await CareerRoleModel.insertMany([
      {
        name: 'Full Stack Developer',
        description: 'Expert in both frontend and backend technologies. Builds complete web applications from the database to the user interface.',
        requiredSkills: [
          { skillId: skillMap['JavaScript'], requiredLevel: 8 },
          { skillId: skillMap['React'], requiredLevel: 7 },
          { skillId: skillMap['Node.js'], requiredLevel: 8 },
          { skillId: skillMap['MongoDB'], requiredLevel: 7 },
        ],
      },
      {
        name: 'Frontend Developer',
        description: 'Focuses on user interface, user experience, and creating beautiful, responsive designs.',
        requiredSkills: [
          { skillId: skillMap['JavaScript'], requiredLevel: 9 },
          { skillId: skillMap['TypeScript'], requiredLevel: 7 },
          { skillId: skillMap['React'], requiredLevel: 9 },
          { skillId: skillMap['Vue.js'], requiredLevel: 6 },
        ],
      },
      {
        name: 'Backend Developer',
        description: 'Focuses on server-side logic, APIs, security, and database architecture.',
        requiredSkills: [
          { skillId: skillMap['Node.js'], requiredLevel: 9 },
          { skillId: skillMap['TypeScript'], requiredLevel: 8 },
          { skillId: skillMap['SQL'], requiredLevel: 8 },
          { skillId: skillMap['Docker'], requiredLevel: 6 },
        ],
      },
      {
        name: 'Data Scientist',
        description: 'Analyzes and interprets complex data to help organizations make better decisions.',
        requiredSkills: [
          { skillId: skillMap['Python'], requiredLevel: 9 },
          { skillId: skillMap['Machine Learning'], requiredLevel: 8 },
          { skillId: skillMap['SQL'], requiredLevel: 8 },
        ],
      },
      {
        name: 'DevOps Engineer',
        description: 'Bridges the gap between development and operations. Focuses on deployment, CI/CD, and server infrastructure.',
        requiredSkills: [
          { skillId: skillMap['Docker'], requiredLevel: 9 },
          { skillId: skillMap['AWS'], requiredLevel: 8 },
          { skillId: skillMap['Python'], requiredLevel: 6 },
        ],
      }
    ]);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

runSeed();
