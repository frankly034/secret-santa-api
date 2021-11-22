import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import User from "./user.entiity";
import { UserService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService]
})

export class UsersModule {}