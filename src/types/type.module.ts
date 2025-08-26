/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { UploadService } from 'src/cloudinary/cloudinar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  providers: [TypeService,UploadService],
  controllers: [TypeController],
  exports: [TypeService],
})
export class TypeModule {}
