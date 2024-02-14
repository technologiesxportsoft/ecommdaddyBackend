// users/users.service.ts
/* Created By: Rahul 30-11-2023 */
import { Injectable, ConflictException, NotFoundException, InternalServerErrorException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<User> {    
    const { email, password, phone } = user;   
    //validation for email or phone
    if (!email && !phone) {
      throw new ConflictException('enter email or phone number!!');
    }

    // if email entered password required
    if (email && !password) {
      throw new ConflictException('password cannot be null!!');
    }

    // Check if the email already exists in the database
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (email && existingUser) {
      throw new ConflictException('Email already exists');
    }    

    try {
      const createdUser = new this.userModel(user);
      return await createdUser.save();
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new BadRequestException('Unable to create user',error.message);
    }
  }

 async loginUser(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // const isPasswordValid = await user.comparePassword(password);

    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      console.error('Error getting all users:', error.message);
      throw new BadRequestException('Unable to retrieve users',error.message);
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
        throw new BadRequestException('Unable to retrieve user',error.message);
      }
    }
  }

  //created by rahul 05-12-2023
  async createSocialUser(user: User): Promise<User> {    
    const { email, social } = user;

    // Check if the email already exists in the database
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      return existingUser;
    }

    if (!social) {
      throw new ConflictException('social type cannot be null!!');
    }

    try {
      const createdUser = new this.userModel(user);
      return await createdUser.save();
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new BadRequestException('Unable to create user',error.message);
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
        throw new BadRequestException('Unable to update user',error.message);
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
        throw new BadRequestException('Unable to delete user',error.message);
      }
    }
  }
}
