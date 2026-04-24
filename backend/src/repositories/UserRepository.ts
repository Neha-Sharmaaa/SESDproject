import { UserModel, IUser } from '../models/User';
import mongoose from 'mongoose';

export class UserRepository {
  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }

  async create(userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<IUser> {
    const user = new UserModel(userData);
    return user.save();
  }
}
