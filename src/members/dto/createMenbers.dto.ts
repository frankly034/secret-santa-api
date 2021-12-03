import Group from "src/groups/group.entity";
import User from "src/users/user.entiity";

export class CreateMembersDto {
  emails: string[];
  invitedBy: User;
  group: Group;
}