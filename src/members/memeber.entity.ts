import Group from "src/groups/group.entity";
import User from "src/users/user.entiity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum GiftStatus {
  PENDING = 'pending',
  SENT = 'sent',
  RECEIVED = 'received',
}

export enum MembershipStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({
    type: 'enum',
    enum: MembershipStatus,
    default: MembershipStatus.INACTIVE,
  })
  status: MembershipStatus;

  @Column({ type: 'enum', enum: GiftStatus, default: GiftStatus.PENDING })
  outgoing: GiftStatus;

  @Column({ type: 'enum', enum: GiftStatus, default: GiftStatus.PENDING })
  incoming: GiftStatus;

  @ManyToOne(() => User, (user: User) => user)
  public member: User;

  @ManyToOne(() => User, (user: User) => user)
  public invitedBy: User;

  @ManyToOne(() => Group, (group: Group) => group)
  public group: Group;

}

export default Member;