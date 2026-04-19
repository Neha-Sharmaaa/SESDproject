import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database;

export async function getDatabase(): Promise<Database> {
  if (db) return db;

  db = await open({
    filename: path.join(__dirname, '../../database.sqlite'),
    driver: sqlite3.Database
  });

  return db;
}

export async function initDatabase() {
  const d = await getDatabase();

  await d.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      skill_id INTEGER,
      level INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (skill_id) REFERENCES skills(id),
      UNIQUE(user_id, skill_id)
    );

    CREATE TABLE IF NOT EXISTS career_roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS career_required_skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      career_id INTEGER,
      skill_id INTEGER,
      required_level INTEGER,
      FOREIGN KEY (career_id) REFERENCES career_roles(id),
      FOREIGN KEY (skill_id) REFERENCES skills(id)
    );

    CREATE TABLE IF NOT EXISTS roadmaps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      career_id INTEGER,
      steps TEXT,
      FOREIGN KEY (career_id) REFERENCES career_roles(id)
    );
  `);

  // Seed initial data if needed
  const userCount = await d.get('SELECT COUNT(*) as count FROM users');
  if (userCount.count === 0) {
    // Basic skills
    await d.exec(`
      INSERT INTO skills (name, category) VALUES 
      ('JavaScript', 'Frontend'),
      ('React', 'Frontend'),
      ('Node.js', 'Backend'),
      ('TypeScript', 'Backend'),
      ('Python', 'Data Science'),
      ('Machine Learning', 'Data Science'),
      ('SQL', 'Database');

      INSERT INTO career_roles (name, description) VALUES 
      ('Full Stack Developer', 'Expert in both frontend and backend technologies.'),
      ('Frontend Developer', 'Focuses on user interface and user experience.'),
      ('Backend Developer', 'Focuses on server-side logic and database.'),
      ('Data Scientist', 'Analyzes and interprets complex data.');

      -- Full Stack Developer needs
      INSERT INTO career_required_skills (career_id, skill_id, required_level) VALUES 
      (1, 1, 8), (1, 2, 8), (1, 3, 8), (1, 7, 7);

      -- Data Scientist needs
      INSERT INTO career_required_skills (career_id, skill_id, required_level) VALUES 
      (4, 5, 9), (4, 6, 8), (4, 7, 7);
    `);
  }
}
