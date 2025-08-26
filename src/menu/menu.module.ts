import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { UploadService } from 'src/cloudinary/cloudinar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  // eslint-disable-next-line prettier/prettier
  providers: [MenuService,UploadService],
  controllers: [MenuController],
})
export class MenuModule {}
