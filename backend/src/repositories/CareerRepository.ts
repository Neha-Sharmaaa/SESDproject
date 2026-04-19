import { BaseRepository } from './BaseRepository';
import { CareerRole, CareerRequiredSkill } from '../models/types';

export class CareerRepository extends BaseRepository<CareerRole> {
    constructor() {
        super('career_roles');
    }

    async getRequiredSkills(careerId: number): Promise<(CareerRequiredSkill & { name: string })[]> {
        const d = await this.db();
        return await d.all(`
            SELECT crs.*, s.name 
            FROM career_required_skills crs 
            JOIN skills s ON crs.skill_id = s.id 
            WHERE crs.career_id = ?
        `, [careerId]);
    }

    async getRoadmap(careerId: number): Promise<any | undefined> {
        const d = await this.db();
        return await d.get(`SELECT * FROM roadmaps WHERE career_id = ?`, [careerId]);
    }
}
