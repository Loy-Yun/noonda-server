import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Wish } from "../wish/wish.entity";

@Entity({ synchronize: true })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @OneToMany(type => Wish, wish => wish.user)
  wishes: Wish[];

  // TODO: reviews 추가
}
