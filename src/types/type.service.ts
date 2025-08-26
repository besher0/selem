/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './type.entity';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  findAll(): Promise<Type[]> {
    return this.typeRepository.find({ relations: ['menus'] });
  }

  findOne(id: number): Promise<Type | null> {
    return this.typeRepository.findOne({ where: { id }, relations: ['menus'] });
  }

  create(data: Partial<Type>): Promise<Type> {
    const newType = this.typeRepository.create(data);
    return this.typeRepository.save(newType);
  }

  async update(id: number, data: Partial<Type>): Promise<Type | null> {
    await this.typeRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.typeRepository.delete(id);
  }
}
