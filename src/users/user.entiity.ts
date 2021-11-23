import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
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
  
}
 
export default User;
