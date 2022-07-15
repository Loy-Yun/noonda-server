import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, RelationId, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ synchronize: true })
export class Collection {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column()
  title: string;

  @Column({nullable: true})
  subTitle: string;

  @Column()
  name: string;
}
