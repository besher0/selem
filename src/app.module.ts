/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // تحميل إعدادات البيئة من .env
    ConfigModule.forRoot({ isGlobal: true }),

    // إعدادات قاعدة البيانات PostgreSQL
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        autoLoadEntities: true, // يحمّل جميع الـ Entities تلقائياً
        synchronize: true,      // فقط للتطوير (ما تستخدمه بالإنتاج)
      }),
    }),
    AuthModule,
    UsersModule,
    MenuModule,
  ],
})
export class AppModule {}
