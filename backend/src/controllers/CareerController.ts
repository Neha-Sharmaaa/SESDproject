import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { CareerService } from '../services/CareerService';

export class CareerController {
  private careerService = CareerService.getInstance();

  async getRecommendations(req: AuthRequest, res: Response) {
    try {
      const recommendations = await this.careerService.getRecommendations(req.user.id);
      res.json(recommendations);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async getRoadmap(req: AuthRequest, res: Response) {
    try {
      const careerId = req.params.careerId as string;
      // careerId is now a MongoDB ObjectId string — no parseInt needed
      const roadmap = await this.careerService.getRoadmap(careerId, req.user.id);
      res.json(roadmap);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
