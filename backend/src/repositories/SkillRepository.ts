import { BaseRepository } from './BaseRepository';
import { Skill, UserSkill } from '../models/types';

export class SkillRepository extends BaseRepository<Skill> {
    constructor() {
        super('skills');
    }

    async findUserSkills(userId: number): Promise<(Skill & { level: number })[]> {
        const d = await this.db();
        return await d.all(`
            SELECT s.*, us.level 
            FROM skills s 
            JOIN user_skills us ON s.id = us.skill_id 
            WHERE us.user_id = ?
        `, [userId]);
    }

    async addUserSkill(userId: number, skillId: number, level: number): Promise<void> {
        const d = await this.db();
        await d.run(`
            INSERT INTO user_skills (user_id, skill_id, level) 
            VALUES (?, ?, ?)
            ON CONFLICT(user_id, skill_id) DO UPDATE SET level = excluded.level
        `, [userId, skillId, level]);
    }
}
