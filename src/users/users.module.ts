import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Group from 'src/groups/group.entity';

import User from './user.entiity';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group])],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
