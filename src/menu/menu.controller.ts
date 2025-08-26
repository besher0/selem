/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UploadedFile, UseInterceptors,  } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './menu.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UploadService } from '../cloudinary/cloudinar.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';

@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly uploadService: UploadService, // ✅ استخدم الإنجيكتد instance
  ) {}

  // جميع المستخدمين يمكنهم الاطلاع
  @Get()
  findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Menu | null> {
    return this.menuService.findOne(id);
  }

  // إنشاء منتج جديد مع رفع الصورة – محمي بـ JWT
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() menuData: Partial<Menu>,
    @UploadedFile() file?: any,
  ): Promise<Menu> {
    if (file){
            const imageUrl = await this.uploadService.uploadFile(file);
      menuData.image = imageUrl;

    }

    return this.menuService.create(menuData);
  }

  // تعديل المنتج – محمي بـ JWT
  @UseGuards(JwtAuthGuard)
  @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: number,
    @Body() menuData: Partial<Menu>,
    @UploadedFile() file?:any,
  ) {
    if (file) menuData.image = file.path;
    return this.menuService.update(id, menuData);
  }

  // حذف المنتج – محمي بـ JWT
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.menuService.remove(id);
  }
}
