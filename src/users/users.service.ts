/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // إنشاء مستخدم جديد
  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(password, 10); // النوع واضح
    const user = this.userRepository.create({ email, password: hashedPassword });
    return await this.userRepository.save(user);
  }

  // البحث عن مستخدم بواسطة الايميل
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // البحث عن مستخدم بواسطة id
  async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // تعديل مستخدم
  async updateUser(id: number, data: Partial<User>): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10); // النوع واضح
    }
    await this.userRepository.update(id, data);
    const updatedUser = await this.findOneById(id);
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }

  // حذف مستخدم
  async removeUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
