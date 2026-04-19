import { BaseRepository } from './BaseRepository';
import { User } from '../models/types';

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super('users');
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const d = await this.db();
        return await d.get(`SELECT * FROM users WHERE email = ?`, [email]);
    }

    async create(user: User): Promise<number> {
        const d = await this.db();
        const result = await d.run(
            `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            [user.name, user.email, user.password, user.role || 'user']
        );
        return result.lastID!;
    }
}
