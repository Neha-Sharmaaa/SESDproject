import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/types';

export class AuthService {
    private static instance: AuthService;
    private userRepository: UserRepository;

    private constructor() {
        this.userRepository = new UserRepository();
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async register(userData: User): Promise<{ token: string, user: User }> {
        const existing = await this.userRepository.findByEmail(userData.email);
        if (existing) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(userData.password!, 10);
        const userId = await this.userRepository.create({
            ...userData,
            password: hashedPassword
        });

        const user = await this.userRepository.findById(userId);
        const token = this.generateToken(user!);
        
        return { token, user: user! };
    }

    async login(email: string, pass: string): Promise<{ token: string, user: User }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(pass, user.password!);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = this.generateToken(user);
        return { token, user };
    }

    private generateToken(user: User): string {
        return jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '1d' }
        );
    }
}
