import { Request } from 'express';
import Member from 'src/members/memeber.entity';
import User from 'src/users/user.entiity';

interface RequestWithMembership extends Request {
  member: Member;
  user: User;
}

export default RequestWithMembership;
