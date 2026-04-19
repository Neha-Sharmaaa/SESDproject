import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { CareerController } from '../controllers/CareerController';
import { SkillController } from '../controllers/SkillController';
import { authenticate } from '../middleware/auth';

const router = Router();
const authController = new AuthController();
const careerController = new CareerController();
const skillController = new SkillController();

// Auth Routes
router.post('/auth/register', (req, res) => authController.register(req, res));
router.post('/auth/login', (req, res) => authController.login(req, res));

// Career Routes
router.get('/careers/recommendations', authenticate, (req, res) => careerController.getRecommendations(req, res));
router.get('/careers/roadmap/:careerId', authenticate, (req, res) => careerController.getRoadmap(req, res));

// Skill Routes
router.get('/skills', authenticate, (req, res) => skillController.getAllSkills(req, res));
router.get('/skills/me', authenticate, (req, res) => skillController.getUserSkills(req, res));
router.post('/skills/me', authenticate, (req, res) => skillController.updateUserSkill(req, res));

export default router;
