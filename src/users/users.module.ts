import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity'; // Make sure this path is correct
import { UploadService } from 'src/cloudinary/cloudinar.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // This provides the UserRepository
  ],
  controllers: [UsersController],
  // eslint-disable-next-line prettier/prettier
  providers: [UsersService,UploadService],
  exports: [UsersService], // This makes UsersService available to other modules
})
// eslint-disable-next-line prettier/prettier
export class UsersModule {}