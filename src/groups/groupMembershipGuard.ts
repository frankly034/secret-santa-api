import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MembersService } from 'src/members/members.service';
import Member from 'src/members/memeber.entity';

@Injectable()
export class GroupMembershipGuard implements CanActivate {
  constructor(private readonly memberService: MembersService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      params: { id },
      user,
    } = request;
    return this.memberService
      .getUserGroupMembership(id, user)
      .then((member: Member) => {
        request.member = member;
        return !!member;
      })
      .catch(() => {
        return false;
      });
  }
}
