import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Performance } from "../performance/performance.entity";

@Entity({ synchronize: true })
export class Wish {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Performance, performance => performance)
  performance: Performance;

  @ManyToOne(type => User, user => user)
  user: User;


}
