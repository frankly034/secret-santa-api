import Group from 'src/groups/group.entity';
import Member from 'src/members/memeber.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;
 
  @Column()
  public firstName: string;
 
  @Column()
  public lastName: string;

  @OneToMany(() => Group, (group: Group) => group.createdBy)
  public createdGroups: Group[];

  @OneToMany(() => Member, (member: Member) => member.member)
  public memberships: Member[];
  
}
 
export default User;
