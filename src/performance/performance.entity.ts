import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

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
}
