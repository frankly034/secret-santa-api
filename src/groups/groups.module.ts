import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from 'src/users/user.entiity';
import Group from './group.entity';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { MembersModule } from 'src/members/members.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, User]),
    MembersModule,
    UsersModule,
  ],
  providers: [GroupsService],
  controllers: [GroupsController],
  exports: [GroupsService],
})
export class GroupsModule {}
