import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import Group from "src/groups/group.entity";
import User from "src/users/user.entiity";
import Member from "./memeber.entity";
import { UsersModule } from "src/users/users.module";
import { MembersService } from "./members.service";
import { MailModule } from "src/mail/mail.module";

@Module({
  imports: [TypeOrmModule.forFeature([Member, User, Group]), UsersModule, MailModule],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {};
