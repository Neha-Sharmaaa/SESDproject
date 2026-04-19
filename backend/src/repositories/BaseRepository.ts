import { Database } from 'sqlite';
import { getDatabase } from '../config/database';

export abstract class BaseRepository<T> {
    protected tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    protected async db(): Promise<Database> {
        return await getDatabase();
    }

    async findAll(): Promise<T[]> {
        const d = await this.db();
        return await d.all(`SELECT * FROM ${this.tableName}`);
    }

    async findById(id: number): Promise<T | undefined> {
        const d = await this.db();
        return await d.get(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    }

    async delete(id: number): Promise<void> {
        const d = await this.db();
        await d.run(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    }
}
