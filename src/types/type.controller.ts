/* eslint-disable prettier/prettier */
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  UseGuards, 
  UploadedFile, 
  UseInterceptors 
} from '@nestjs/common';
import { TypeService } from './type.service';
import { Type } from './type.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../cloudinary/cloudinar.service';

@Controller('types')
export class TypeController {
  constructor(
    private readonly typeService: TypeService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  findAll(): Promise<Type[]> {
    return this.typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Type | null> {
    return this.typeService.findOne(id);
  }

  // إنشاء نوع جديد مع رفع صورة – محمي بـ JWT
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() data: Partial<Type>,
    @UploadedFile() file?: any,
  ): Promise<Type> {
    if (file) {
      const imageUrl = await this.uploadService.uploadFile(file);
      data.image = imageUrl;
    }
    return this.typeService.create(data);
  }

  // تعديل النوع مع رفع صورة جديدة – محمي بـ JWT
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Type>,
    @UploadedFile() file?: any,
  ): Promise<Type | null> {
    if (file) {
      const imageUrl = await this.uploadService.uploadFile(file);
      data.image = imageUrl;
    }
    return this.typeService.update(id, data);
  }

  // حذف النوع – محمي بـ JWT
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.typeService.remove(id);
  }
}
