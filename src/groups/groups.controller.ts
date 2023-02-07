import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthenticationGuard } from 'src/authentication/jwtAuthenticationGuard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import RequestWithMembership from './requestWithMembership.interface';
import { createGroupDto } from './dto/createGroup.dto';
import { GroupsService } from './groups.service';
import { GroupMembershipGuard } from './groupMembershipGuard';
import { MembersService } from 'src/members/members.service';

@Controller('groups')
@UseGuards(JwtAuthenticationGuard)
export class GroupsController {
  constructor(
    private readonly groupService: GroupsService,
    private readonly memberService: MembersService,
  ) {}

  @Get('memberships')
  getUserMemberShips(@Req() req: RequestWithUser) {
    const { user } = req;
    return this.groupService.getMemberships(user);
  }

  @Post()
  createGroupMember(
    @Body() memberData: createGroupDto,
    @Req() req: RequestWithUser,
  ) {
    const { user } = req;
    return this.groupService.createGroup(memberData, user);
  }

  @Post(':id/activate')
  @UseGuards(GroupMembershipGuard)
  @HttpCode(200)
  async getGroup(@Param('id') _: string, @Req() req: RequestWithMembership) {
    const { member } = req;
    return this.memberService.activate(member);
  }
}
