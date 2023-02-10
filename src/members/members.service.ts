import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { CreateMemberDto } from './dto/createMember.dto';
import Member from './memeber.entity';
import { UserService } from 'src/users/users.service';
import { CreateMembersDto } from './dto/createMenbers.dto';
import { MailService } from 'src/mail/mail.service';
import User from 'src/users/user.entiity';
import { MembershipStatus } from './memeber.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  private async createMember(memberData: CreateMemberDto) {
    const { member, invitedBy, group } = memberData;
    const createdMember = this.memberRepository.create(memberData);
    const savedMember = await this.memberRepository.save(createdMember);
    await this.mailService.queueInvitationMail(member, invitedBy, group);
    return savedMember;
  }

  async createMembers(membersData: CreateMembersDto) {
    let members = [];
    const { emails, invitedBy, group } = membersData;
    const updatedEmails = [...new Set([...emails, invitedBy.email])];
    const users = await Promise.all(
      updatedEmails.map((email) => this.userService.getByEmailOrCreate(email)),
    );
    try {
      members = await Promise.all(
        users.map((user) =>
          this.createMember({
            isAdmin: invitedBy.email === user.email,
            member: user,
            invitedBy,
            group,
          }),
        ),
      );
    } catch (error) {
      console.log('Error creating members', error);
    }
    return members;
  }

  async getUserGroupMembership(groupId: string, member: User) {
    const membership = await this.memberRepository.findOne(
      { group: { id: groupId }, member },
      { relations: ['member', 'invitedBy', 'group'] },
    );
    return membership;
  }

  async getAdmin(groupId: string) {
    const admin = await this.memberRepository.findOne({
      group: { id: groupId },
      isAdmin: true,
    });
    return admin;
  }

  async activate(member: Member) {
    if (member.status === MembershipStatus.INACTIVE) {
      await this.memberRepository.update(
        { id: member.id },
        { status: MembershipStatus.ACTIVE },
      );
      return await this.memberRepository.findOne(member.id, {
        relations: ['member', 'invitedBy', 'group'],
      });
    }
    return member;
  }

  async getUnmatchedActiveGroupMembers(groupId: string) {
    const members = await this.memberRepository.find({
      donor: IsNull(),
      group: { id: groupId },
      status: MembershipStatus.ACTIVE,
    });

    return members;
  }

  async updateDonorRecipient(donor: Member, recipient: Member) {
    this.memberRepository.update(
      { id: donor.id },
      { recipient: recipient.member },
    );
    this.memberRepository.update({ id: recipient.id }, { donor: donor.member });
  }
}
