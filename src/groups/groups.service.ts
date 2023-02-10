import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomNotFoundException } from 'src/Exceptions/CustomNotFoundException';
import Group from './group.entity';
import User from 'src/users/user.entiity';
import { createGroupDto } from './dto/createGroup.dto';
import { MembersService } from 'src/members/members.service';
import { UserService } from 'src/users/users.service';
import Member from 'src/members/memeber.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly memberService: MembersService,
    private readonly userService: UserService,
  ) {}

  async findGroupById(id: string): Promise<Group> {
    const group = await this.groupRepository.findOne(id, {
      relations: ['createdBy', 'members'],
    });
    if (!group) {
      throw new CustomNotFoundException('Group not found');
    }
    return group;
  }

  async getGroups(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async createGroup(groupData: createGroupDto, authUser: User): Promise<Group> {
    const { title, emails } = groupData;
    const createdGroup = this.groupRepository.create({
      title,
      createdBy: authUser,
    });
    const savedGroup = await this.groupRepository.save(createdGroup);
    await this.memberService.createMembers({
      emails,
      invitedBy: authUser,
      group: savedGroup,
    });
    const newGroup = this.findGroupById(savedGroup.id);
    return newGroup;
  }

  async getMemberships(authUser: User) {
    return this.userService.getUserMemberships(authUser);
  }

  private async runMatch(members: Member[]) {
    let index = 0;
    const recipients = [...members];
    while (index < recipients.length) {
      const randomIndex = Math.floor(Math.random() * members.length);
      const selectedRecipient = recipients[index];
      const randomDonor = members[randomIndex];

      if (selectedRecipient.id !== randomDonor.id) {
        this.memberService.updateDonorRecipient(randomDonor, selectedRecipient);
        members.splice(randomIndex, 1);
        index++;
      }
    }
  }

  async match(id: string) {
    const unmatchedActiveGroupMembers =
      await this.memberService.getUnmatchedActiveGroupMembers(id);

    if (unmatchedActiveGroupMembers.length <= 1) {
      throw new HttpException(
        'Requires more than one unmatched active member to run match',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    this.runMatch(unmatchedActiveGroupMembers);

    return { message: 'Matching in progress' };
  }
}
