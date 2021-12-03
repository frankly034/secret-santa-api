import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMemberDto } from './dto/createMember.dto';
import Member from './memeber.entity';
import { UserService } from 'src/users/users.service';
import { CreateMembersDto } from './dto/createMenbers.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private readonly userService: UserService,
  ) {}

  private async createMember(memberData: CreateMemberDto) {
    const createdMember = this.memberRepository.create(memberData);
    const savedMember = await this.memberRepository.save(createdMember);
    return savedMember;
  }

  async createMembers(membersData: CreateMembersDto) {
    const { emails, invitedBy, group } = membersData;
    const updatedEmails = [...new Set([...emails, invitedBy.email])];
    const users = await Promise.all(
      updatedEmails.map((email) => this.userService.getByEmailOrCreate(email)),
    );
    const members = await Promise.all(
      users.map((user) =>
        this.createMember({
          isAdmin: invitedBy.email === user.email,
          member: user,
          invitedBy,
          group,
        }),
      ),
    );
    return members;
  }
}
