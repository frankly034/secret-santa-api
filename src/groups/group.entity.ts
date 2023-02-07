import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from 'src/users/user.entiity';
import Member from 'src/members/memeber.entity';

@Entity()
class Group {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @ManyToOne(() => User, (user: User) => user.createdGroups)
  public createdBy: User;

  @OneToMany(() => Member, (member: Member) => member.group)
  public members: Member[];
}

export default Group;
