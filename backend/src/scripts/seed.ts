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
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB.');

    // Clear existing data
    console.log('🗑️ Clearing existing database collections...');
    await SkillModel.deleteMany({});
    await CareerRoleModel.deleteMany({});

    console.log('🌱 Seeding extensive Skill catalog...');
    const skillsData = [
      // Frontend Ecosystem
      { name: 'JavaScript', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'Vue.js', category: 'Frontend' },
      { name: 'Angular', category: 'Frontend' },
      { name: 'HTML5 & CSS3', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      
      // Backend Ecosystem
      { name: 'Node.js', category: 'Backend' },
      { name: 'Express.js', category: 'Backend' },
      { name: 'NestJS', category: 'Backend' },
      { name: 'Python', category: 'Backend' },
      { name: 'Django', category: 'Backend' },
      { name: 'Java', category: 'Backend' },
      { name: 'Spring Boot', category: 'Backend' },
      { name: 'Go (Golang)', category: 'Backend' },
      { name: 'Rust', category: 'Backend' },

      // Database & Messaging
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'MySQL', category: 'Database' },
      { name: 'MongoDB', category: 'Database' },
      { name: 'Redis', category: 'Database' },
      { name: 'Elasticsearch', category: 'Database' },
      { name: 'GraphQL', category: 'Database' },

      // DevOps, Cloud & Architecture
      { name: 'Docker', category: 'DevOps' },
      { name: 'Kubernetes', category: 'DevOps' },
      { name: 'AWS (Amazon Web Services)', category: 'Cloud' },
      { name: 'Google Cloud Platform (GCP)', category: 'Cloud' },
      { name: 'Microsoft Azure', category: 'Cloud' },
      { name: 'Terraform', category: 'DevOps' },
      { name: 'CI/CD Pipelines', category: 'DevOps' },

      // Mobile Development
      { name: 'React Native', category: 'Mobile' },
      { name: 'Flutter', category: 'Mobile' },
      { name: 'Swift (iOS)', category: 'Mobile' },
      { name: 'Kotlin (Android)', category: 'Mobile' },

      // Data & AI
      { name: 'Machine Learning', category: 'Data Science' },
      { name: 'TensorFlow', category: 'Data Science' },
      { name: 'PyTorch', category: 'Data Science' },
      { name: 'Pandas & NumPy', category: 'Data Science' },
      { name: 'Data Engineering', category: 'Data Science' },
    ];
    
    const skills = await SkillModel.insertMany(skillsData);

    // Create a mapping of Skill Name -> Skill ID for easy referencing
    const skillMap: Record<string, mongoose.Types.ObjectId> = {};
    skills.forEach((s) => {
      skillMap[s.name] = s._id as mongoose.Types.ObjectId;
    });

    console.log('💼 Seeding realistic Career Roles & Roadmaps...');
    await CareerRoleModel.insertMany([
      {
        name: 'Senior Full Stack Engineer',
        description: 'Architects and builds comprehensive, highly scalable web applications from the infrastructure layer up to the interactive user interface.',
        requiredSkills: [
          { skillId: skillMap['TypeScript'], requiredLevel: 9 },
          { skillId: skillMap['React'], requiredLevel: 8 },
          { skillId: skillMap['Node.js'], requiredLevel: 8 },
          { skillId: skillMap['PostgreSQL'], requiredLevel: 7 },
          { skillId: skillMap['AWS (Amazon Web Services)'], requiredLevel: 6 },
          { skillId: skillMap['Docker'], requiredLevel: 7 },
        ],
      },
      {
        name: 'Frontend Architect',
        description: 'Leads the frontend ecosystem, focusing on web performance, accessibility, scalable UI architecture, and complex state management.',
        requiredSkills: [
          { skillId: skillMap['JavaScript'], requiredLevel: 10 },
          { skillId: skillMap['TypeScript'], requiredLevel: 9 },
          { skillId: skillMap['React'], requiredLevel: 9 },
          { skillId: skillMap['Next.js'], requiredLevel: 8 },
          { skillId: skillMap['HTML5 & CSS3'], requiredLevel: 9 },
          { skillId: skillMap['Tailwind CSS'], requiredLevel: 8 },
        ],
      },
      {
        name: 'Backend Systems Engineer',
        description: 'Designs secure, high-throughput, low-latency microservices and robust database architectures capable of handling millions of requests.',
        requiredSkills: [
          { skillId: skillMap['Go (Golang)'], requiredLevel: 8 },
          { skillId: skillMap['Node.js'], requiredLevel: 9 },
          { skillId: skillMap['PostgreSQL'], requiredLevel: 9 },
          { skillId: skillMap['Redis'], requiredLevel: 8 },
          { skillId: skillMap['Docker'], requiredLevel: 8 },
          { skillId: skillMap['GraphQL'], requiredLevel: 7 },
        ],
      },
      {
        name: 'Cloud Infrastructure Engineer / DevOps',
        description: 'Bridges the gap between software development and IT operations. Focuses on automation, zero-downtime deployments, and cloud scalability.',
        requiredSkills: [
          { skillId: skillMap['AWS (Amazon Web Services)'], requiredLevel: 9 },
          { skillId: skillMap['Kubernetes'], requiredLevel: 8 },
          { skillId: skillMap['Docker'], requiredLevel: 9 },
          { skillId: skillMap['Terraform'], requiredLevel: 8 },
          { skillId: skillMap['CI/CD Pipelines'], requiredLevel: 9 },
          { skillId: skillMap['Python'], requiredLevel: 6 },
        ],
      },
      {
        name: 'Machine Learning Engineer',
        description: 'Develops and deploys scalable AI models to production environments, bridging the gap between data science and software engineering.',
        requiredSkills: [
          { skillId: skillMap['Python'], requiredLevel: 9 },
          { skillId: skillMap['Machine Learning'], requiredLevel: 8 },
          { skillId: skillMap['PyTorch'], requiredLevel: 7 },
          { skillId: skillMap['Pandas & NumPy'], requiredLevel: 8 },
          { skillId: skillMap['PostgreSQL'], requiredLevel: 6 },
        ],
      },
      {
        name: 'Mobile App Developer',
        description: 'Creates seamless, high-performance applications for iOS and Android devices, focusing on mobile UI/UX and native device features.',
        requiredSkills: [
          { skillId: skillMap['React Native'], requiredLevel: 9 },
          { skillId: skillMap['TypeScript'], requiredLevel: 8 },
          { skillId: skillMap['Swift (iOS)'], requiredLevel: 6 },
          { skillId: skillMap['Kotlin (Android)'], requiredLevel: 6 },
          { skillId: skillMap['GraphQL'], requiredLevel: 7 },
        ],
      }
    ]);

    console.log('✅ Database successfully seeded with 30+ detailed skills and 6 complex career paths!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

runSeed();
