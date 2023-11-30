// users/users.service.ts
/* Created By: Rahul 30-11-2023 */
import { Injectable, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<User> {
    const { email } = user;

    // Check if the email already exists in the database
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    try {
      const createdUser = new this.userModel(user);
      return await createdUser.save();
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new InternalServerErrorException('Unable to create user');
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      console.error('Error getting all users:', error.message);
      throw new InternalServerErrorException('Unable to retrieve users');
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error('Error getting user by ID:', error.message);
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException as it is a client error
      } else {
        throw new InternalServerErrorException('Unable to retrieve user');
      }
    }
  }

  async updateUser(id: string, updatedUser: User): Promise<User> {
    const { email } = updatedUser;

    // Check if the email already exists in the database for other users
    const existingUser = await this.userModel.findOne({ email, _id: { $ne: id } }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists for another user');
    }

    try {
      const user = await this.userModel.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error('Error updating user:', error.message);
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException as it is a client error
      } else {
        throw new InternalServerErrorException('Unable to update user');
      }
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndDelete(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error('Error deleting user:', error.message);
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException as it is a client error
      } else {
        throw new InternalServerErrorException('Unable to delete user');
      }
    }
  }
}
