import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService = AuthService.getInstance();

    async register(req: Request, res: Response) {
        try {
            const result = await this.authService.register(req.body);
            res.status(201).json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
