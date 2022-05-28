import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ synchronize: false })
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

  @Column()
  imgs: string[];

  @Column()
  keywords: string[];
}
