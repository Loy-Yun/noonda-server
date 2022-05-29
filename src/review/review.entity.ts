import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ synchronize: true })
export class Review {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  performance_id: number;

  @Column()
  title: string;

  @Column()
  rate: number;

  @Column()
  content: string;

  /*
  @OneToMany()
  imgs: string[];

  @OneToMany()
  keywords: string[];
  */
}
