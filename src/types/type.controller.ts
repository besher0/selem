/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TypeService } from './type.service';
import { Type } from './type.entity';

@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  findAll(): Promise<Type[]> {
    return this.typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Type | null> {
    return this.typeService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Type>): Promise<Type> {
    return this.typeService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Type>) {
    return this.typeService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.typeService.remove(id);
  }
}
