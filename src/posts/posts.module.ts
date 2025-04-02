// posts.module.ts
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { AuthModule } from 'src/auth/auth.module'; // ✅ 추가!
import { UsersModule } from 'src/users/users.module'; // ✅ 추가!

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsModel]),
    AuthModule, // ✅ 여기에 넣어줘야 AccessTokenGuard에서 AuthService 주입됨
    UsersModule, // ✅ 여기에 넣어줘야 UsersService 주입됨
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
