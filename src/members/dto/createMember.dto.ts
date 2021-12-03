import Group from "src/groups/group.entity";
import User from "src/users/user.entiity";

export class CreateMemberDto {
  isAdmin: boolean;
  member: User;
  invitedBy: User;
  group: Group;
}