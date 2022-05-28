import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity({ synchronize: false })
export class Wish {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  performance: Performance;

  @Column()
  user: User;


}
