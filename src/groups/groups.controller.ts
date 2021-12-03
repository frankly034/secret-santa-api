import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthenticationGuard } from 'src/authentication/jwtAuthenticationGuard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { createGroupDto } from './dto/createGroup.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
@UseGuards(JwtAuthenticationGuard)
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @Get('memberships')
  getUserMemberShips(@Req() req: RequestWithUser){
    const { user } = req;
    return this.groupService.getMemberships(user);
  }

  @Post()
  createGroupMember(@Body() memberData: createGroupDto, @Req() req: RequestWithUser) {
    const { user } = req;
    return this.groupService.createGroup(memberData, user);
  }
}
