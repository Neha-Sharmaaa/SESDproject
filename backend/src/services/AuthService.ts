import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../models/User';

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

  async register(userData: { name: string; email: string; password: string; role?: 'user' | 'admin' }) {
    const existing = await this.userRepository.findByEmail(userData.email);
    if (existing) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const token = this.generateToken(user);
    return { token, user: this.sanitizeUser(user) };
  }

  async login(email: string, pass: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = this.generateToken(user);
    return { token, user: this.sanitizeUser(user) };
  }

  private generateToken(user: IUser): string {
    return jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1d' }
    );
  }

  private sanitizeUser(user: IUser) {
    const u = user.toObject() as any;
    delete u.password;
    return u;
  }
}
