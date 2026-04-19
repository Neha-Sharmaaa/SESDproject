import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { SkillService } from '../services/SkillService';

export class SkillController {
    private skillService = SkillService.getInstance();

    async getAllSkills(req: AuthRequest, res: Response) {
        try {
            const skills = await this.skillService.getAllSkills();
            res.json(skills);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async getUserSkills(req: AuthRequest, res: Response) {
        try {
            const skills = await this.skillService.getUserSkills(req.user.id);
            res.json(skills);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateUserSkill(req: AuthRequest, res: Response) {
        try {
            const { skillId, level } = req.body;
            await this.skillService.updateUserSkill(req.user.id, skillId, level);
            res.json({ message: 'Skill updated successfully' });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteUserSkill(req: AuthRequest, res: Response) {
        try {
            const { skillId } = req.params;
            await this.skillService.deleteUserSkill(req.user.id, parseInt(skillId));
            res.json({ message: 'Skill deleted successfully' });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
