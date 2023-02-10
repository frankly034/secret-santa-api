import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MembersService } from 'src/members/members.service';
import Member from 'src/members/memeber.entity';

@Injectable()
export class GroupAdminGuard implements CanActivate {
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
      .getAdmin(id)
      .then((member: Member) => {
        return member.member.id === user.id;
      })
      .catch(() => {
        return false;
      });
  }
}
