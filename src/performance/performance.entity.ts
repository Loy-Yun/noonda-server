import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, RelationId } from "typeorm";
import { Wish } from "../wish/wish.entity";

@Entity({ synchronize: false })
export class Performance {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seq: number;

  @Column()
  title: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  place: string;

  @Column()
  category: string;

  @Column()
  area: string;

  @Column()
  thumbnail: string;

  @Column()
  price: string;

  @Column()
  link: string;

  @Column()
  gps_x: number;

  @Column()
  gps_y: number;

  @Column({default: 0})
  views: number;

  @RelationId((wish: Wish) => wish.performance)
  wishes: number[];
}
